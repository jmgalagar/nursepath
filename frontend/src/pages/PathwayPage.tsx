import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardBody, Button, ProgressBar, Spinner, EmptyState, StepIcon } from "../components/ui";
import { useAuth } from "../lib/auth";
import type {
  Pathway, Step, VideoStep, ReadingStep,
  PracticeStep, QuizStep, SimulationStep,
} from "@nursepath/shared";
import { STEP_XP } from "@nursepath/shared";
import * as api from "../lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PathwayPage() {
  const { pathwayId } = useParams<{ pathwayId: string }>();
  const { completedSteps, refreshGamification, refreshProgress } = useAuth();

  const [pathway, setPathway] = useState<Pathway | null>(null);
  const [courseCode, setCourseCode] = useState<string | null>(null);
  const [unitId, setUnitId] = useState<string | null>(null);
  const [unitTitle, setUnitTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [marking, setMarking] = useState(false);
  const [xpPopup, setXpPopup] = useState<number | null>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Decision simulation state
  const [simNodeId, setSimNodeId] = useState<string | null>(null);
  const [simFeedback, setSimFeedback] = useState<string | null>(null);
  const [simSuccess, setSimSuccess] = useState(false);

  // Sequence simulation state
  const [seqOrder, setSeqOrder] = useState<number[]>([]);
  const [seqSubmitted, setSeqSubmitted] = useState(false);

  // Practice checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!pathwayId) return;
    api.getPathway(pathwayId)
      .then((data) => {
        setPathway(data.pathway);
        setCourseCode(data.courseCode);
        setUnitId(data.unitId);
        setUnitTitle(data.unitTitle);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [pathwayId]);

  // Reset state when step changes
  useEffect(() => {
    if (!pathway) return;
    const step = pathway.steps[activeStepIdx];
    if (!step) return;

    setQuizAnswers({});
    setQuizSubmitted(false);
    setSimFeedback(null);
    setSimSuccess(false);
    setCheckedItems({});

    if (step.kind === "simulation") {
      const sim = step as SimulationStep;
      if (sim.simKind === "decision") {
        setSimNodeId(sim.entry);
      } else {
        const indices = sim.items.map((_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        setSeqOrder(indices);
        setSeqSubmitted(false);
      }
    }
  }, [pathway, activeStepIdx]);

  const currentStep: Step | undefined = pathway?.steps[activeStepIdx];
  const isCompleted = currentStep ? completedSteps.has(currentStep.id) : false;

  async function handleComplete() {
    if (!currentStep || marking) return;
    setMarking(true);
    try {
      const result = await api.markStep(currentStep.id);
      if (result.xpAwarded > 0) {
        setXpPopup(result.xpAwarded);
        setTimeout(() => setXpPopup(null), 2500);
      }
      await refreshGamification();
      await refreshProgress();
      // Auto-advance to next uncompleted step
      const nextIdx = pathway!.steps.findIndex(
        (s, i) => i > activeStepIdx && !completedSteps.has(s.id),
      );
      if (nextIdx !== -1) setActiveStepIdx(nextIdx);
    } catch {} finally {
      setMarking(false);
    }
  }

  function seqMove(pos: number, dir: number) {
    setSeqOrder((prev) => {
      const next = [...prev];
      const swap = pos + dir;
      if (swap < 0 || swap >= next.length) return prev;
      [next[pos], next[swap]] = [next[swap], next[pos]];
      return next;
    });
  }

  if (loading) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }
  if (!pathway) {
    return <EmptyState icon="❓" title="Pathway not found" />;
  }

  const allDone = pathway.steps.every((s) => completedSteps.has(s.id));

  return (
    <div className="space-y-6">
      {/* XP popup */}
      {xpPopup !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-bounce rounded-2xl bg-amber-500/90 px-8 py-4 text-center shadow-xl">
            <div className="text-3xl font-bold text-white">+{xpPopup} XP</div>
            <div className="text-sm text-white/80">Step completed!</div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
        <Link to="/courses" className="hover:text-primary">Courses</Link>
        {courseCode && (<><span>/</span><Link to={`/courses/${courseCode}`} className="hover:text-primary">{courseCode}</Link></>)}
        {unitId && unitTitle && (<><span>/</span><Link to={`/units/${unitId}`} className="hover:text-primary">{unitTitle}</Link></>)}
        <span>/</span>
        <span className="text-gray-900">{pathway.title}</span>
      </div>

      {/* Pathway header */}
      <div className="flex items-center gap-4">
        <span className="text-4xl">{pathway.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{pathway.title}</h1>
          <p className="text-gray-500">{pathway.summary}</p>
        </div>
      </div>

      {/* Step progress bar */}
      <div className="flex items-center gap-2 flex-wrap">
        {pathway.steps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => setActiveStepIdx(i)}
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-all ${
              i === activeStepIdx
                ? "bg-primary text-white shadow-md scale-110"
                : completedSteps.has(step.id)
                  ? "bg-secondary/20 text-secondary"
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
            title={step.title}
          >
            {completedSteps.has(step.id) ? "✓" : i + 1}
          </button>
        ))}
        {allDone && (
          <span className="ml-2 badge-chip bg-secondary/20 text-secondary text-sm px-3 py-1">🎉 Pathway Complete!</span>
        )}
      </div>

      {/* Step content */}
      {currentStep && !allDone && (
        <Card>
          <CardBody className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <StepIcon kind={currentStep.kind} />
                <div>
                  <h2 className="text-lg font-semibold">{currentStep.title}</h2>
                  <p className="text-sm text-gray-500">{currentStep.summary}</p>
                </div>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <span className="badge-gold">+{currentStep.xp ?? STEP_XP[currentStep.kind]} XP</span>
                {currentStep.minutes && <span className="text-xs text-gray-400">~{currentStep.minutes} min</span>}
              </div>
            </div>

            <hr className="border-gray-100" />

            {currentStep.kind === "video" && <VideoView step={currentStep as VideoStep} />}
            {currentStep.kind === "reading" && <ReadingView step={currentStep as ReadingStep} />}
            {currentStep.kind === "practice" && <PracticeView step={currentStep as PracticeStep} checked={checkedItems} setChecked={setCheckedItems} />}
            {currentStep.kind === "simulation" && (
              currentStep.simKind === "decision" ? (
                <DecisionSimView step={currentStep} nodeId={simNodeId ?? currentStep.entry} feedback={simFeedback} success={simSuccess}
                  onChoose={(next, fb) => { setSimFeedback(fb ?? null); setSimNodeId(next ?? null); if (next && currentStep.nodes[next]?.success) setSimSuccess(true); }}
                  onReset={() => { setSimNodeId(currentStep.entry); setSimFeedback(null); setSimSuccess(false); }}
                />
              ) : (
                <SequenceSimView step={currentStep} order={seqOrder} submitted={seqSubmitted} onMove={seqMove} onCheck={() => setSeqSubmitted(true)}
                  onRetry={() => { const idx = currentStep.items.map((_, i) => i); for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; } setSeqOrder(idx); setSeqSubmitted(false); }}
                />
              )
            )}
            {currentStep.kind === "quiz" && (
              <QuizView step={currentStep as QuizStep} answers={quizAnswers} submitted={quizSubmitted}
                onAnswer={(qid, idx) => setQuizAnswers((p) => ({ ...p, [qid]: idx }))}
                onSubmit={() => setQuizSubmitted(true)}
                onRetake={() => { setQuizAnswers({}); setQuizSubmitted(false); }}
              />
            )}

            <hr className="border-gray-100" />
            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" onClick={() => activeStepIdx > 0 && setActiveStepIdx(activeStepIdx - 1)} disabled={activeStepIdx === 0}>
                ← Previous
              </Button>
              <div className="flex gap-3">
                {!isCompleted && <Button onClick={handleComplete} disabled={marking}>{marking ? "Completing…" : "✓ Complete Step"}</Button>}
                {isCompleted && <span className="badge-chip bg-secondary/20 text-secondary px-3 py-1.5 text-sm font-medium">✓ Completed</span>}
                {activeStepIdx < pathway.steps.length - 1 && (
                  <Button variant="ghost" onClick={() => setActiveStepIdx(activeStepIdx + 1)}>Next →</Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {allDone && (
        <Card>
          <CardBody className="text-center py-12">
            <span className="text-6xl">🎉</span>
            <h2 className="mt-4 text-2xl font-bold text-secondary">Pathway Complete!</h2>
            <p className="mt-2 text-gray-500">You&apos;ve completed all {pathway.steps.length} steps in this pathway.</p>
            {unitId && unitTitle && <Link to={`/units/${unitId}`} className="btn-primary mt-6 inline-flex">← Back to {unitTitle}</Link>}
          </CardBody>
        </Card>
      )}
    </div>
  );
}

/* ==========================================================================
 * Sub-components for each step type
 * ========================================================================== */

function VideoView({ step }: { step: VideoStep }) {
  // Convert youtube.com watch URLs to embed format
  const getEmbedUrl = (url: string): string => {
    try {
      const u = new URL(url);
      (url);
      if (u.hostname.includes("youtube.com") && u.pathname === "/watch") {
        const videoId = u.searchParams.get("v");
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      }
      if (u.hostname.includes("youtu.be")) {
        const videoId = u.pathname.slice(1);
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch {}
    return url;
  };

  return (
    <div className="space-y-4">
      {step.url && (
        <div className="aspect-video w-full rounded-lg bg-gray-900 overflow-hidden">
          <iframe src={getEmbedUrl(step.url)} title={step.title} className="h-full w-full" allowFullScreen />
        </div>
      )}
      {step.transcript && (
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Transcript / Key Points</h4>
          <div className="prose prose-sm max-w-none text-gray-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{step.transcript}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

function ReadingView({ step }: { step: ReadingStep }) {
  return (
    <div className="space-y-4">
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{step.body}</ReactMarkdown>
      </div>
      {step.takeaways && step.takeaways.length > 0 && (
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
          <h4 className="text-sm font-semibold text-primary mb-2">📝 Key Takeaways</h4>
          <ul className="space-y-1">
            {step.takeaways.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 text-primary">✓</span>{t}
              </li>
            ))}
          </ul>
        </div>
      )}
      {step.source && <p className="text-xs text-gray-400 italic">Source: {step.source}</p>}
    </div>
  );
}

function PracticeView({ step, checked, setChecked }: {
  step: PracticeStep;
  checked: Record<string, boolean>;
  setChecked: (fn: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
}) {
  function toggle(item: string) {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  }
  const pct = step.checklist.length > 0 ? Math.round((step.checklist.filter((c) => checked[c]).length / step.checklist.length) * 100) : 0;
  const allChecked = step.checklist.length > 0 && step.checklist.every((c) => checked[c]);

  return (
    <div className="space-y-4">
      {step.equipment && step.equipment.length > 0 && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
          <h4 className="text-sm font-semibold text-amber-800 mb-1">🔧 Equipment Needed</h4>
          <div className="flex flex-wrap gap-2">
            {step.equipment.map((e, i) => <span key={i} className="badge-chip bg-amber-100 text-amber-800">{e}</span>)}
          </div>
        </div>
      )}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-600">Checklist</h4>
        {step.checklist.map((item, i) => (
          <label key={i} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
            checked[item] ? "border-secondary bg-secondary/5" : "border-gray-200 bg-white hover:bg-gray-50"
          }`}>
            <input type="checkbox" checked={!!checked[item]} onChange={() => toggle(item)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary" />
            <span className={`text-sm ${checked[item] ? "text-secondary font-medium" : "text-gray-700"}`}>{item}</span>
          </label>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <ProgressBar percent={pct} color="bg-secondary" className="flex-1" />
        <span className="text-sm font-medium text-gray-600">{pct}%</span>
      </div>
      {allChecked && <div className="rounded-lg bg-secondary/10 border border-secondary/20 p-3 text-sm text-secondary font-medium">✓ All items checked! You can mark this step as complete.</div>}
    </div>
  );
}

function DecisionSimView({ step, nodeId, feedback, success, onChoose, onReset }: {
  step: SimulationStep & { simKind: "decision" };
  nodeId: string;
  feedback: string | null;
  success: boolean;
  onChoose: (next: string, feedback?: string) => void;
  onReset: () => void;
}) {
  const node = step.nodes[nodeId];
  if (!node) return <p className="text-alert">Node not found</p>;

  return (
    <div className="space-y-4">
      {node.patient && (
        <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Patient</h4>
          <div className="grid gap-2 sm:grid-cols-2 text-sm">
            {node.patient.name && <div><span className="text-gray-500">Name:</span> <span className="font-medium">{node.patient.name}</span></div>}
            {node.patient.age && <div><span className="text-gray-500">Age:</span> <span className="font-medium">{node.patient.age}y</span></div>}
            {node.patient.sex && <div><span className="text-gray-500">Sex:</span> <span className="font-medium">{node.patient.sex}</span></div>}
            {node.patient.context && <div className="sm:col-span-2"><span className="text-gray-500">Context:</span> <span className="font-medium">{node.patient.context}</span></div>}
            {node.patient.vitals && Object.entries(node.patient.vitals).length > 0 && (
              <div className="sm:col-span-2 grid grid-cols-3 gap-2 mt-1">
                {Object.entries(node.patient.vitals).map(([k, v]) => (
                  <div key={k} className="rounded-md bg-white border px-2 py-1 text-center">
                    <div className="text-xs text-gray-500">{k}</div>
                    <div className="font-semibold text-primary">{v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
        <p className="text-sm text-gray-800 whitespace-pre-wrap">{node.scenario}</p>
      </div>
      {feedback && <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">💬 {feedback}</div>}
      {node.choices && node.choices.length > 0 && !success && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-600">What do you do?</h4>
          {node.choices.map((ch) => (
            <button key={ch.id} onClick={() => onChoose(ch.next, ch.feedback)}
              className="w-full rounded-lg border border-gray-200 bg-white p-3 text-left text-sm text-gray-700 hover:border-primary hover:bg-primary/5 transition-colors">
              {ch.label}
            </button>
          ))}
        </div>
      )}
      {(!node.choices || node.choices.length === 0 || success) && (
        <div className={`rounded-lg border p-4 ${success || node.success ? "border-secondary bg-secondary/10" : "border-gray-200 bg-gray-50"}`}>
          <h4 className={`font-semibold ${success || node.success ? "text-secondary" : "text-gray-700"}`}>
            {success || node.success ? "✅ Correct!" : "📋 Debrief"}
          </h4>
          {node.debrief && <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{node.debrief}</p>}
          {success && <Button variant="secondary" size="sm" className="mt-3" onClick={onReset}>Try again from start</Button>}
        </div>
      )}
    </div>
  );
}

function SequenceSimView({ step, order, submitted, onMove, onCheck, onRetry }: {
  step: SimulationStep & { simKind: "sequence" };
  order: number[];
  submitted: boolean;
  onMove: (pos: number, dir: number) => void;
  onCheck: () => void;
  onRetry: () => void;
}) {
  const isCorrect = order.every((itemIdx, pos) => itemIdx === pos);

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
        <h4 className="text-sm font-semibold text-primary mb-1">Instructions</h4>
        <p className="text-sm text-gray-700">{step.instruction}</p>
      </div>
      <p className="text-sm text-gray-500">Use the arrows to reorder items into the correct sequence:</p>
      <div className="space-y-2">
        {order.map((itemIdx, pos) => (
          <div key={`seq-${pos}`} className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
            submitted ? (itemIdx === pos ? "border-secondary bg-secondary/10" : "border-gray-200 bg-gray-50")
              : "border-gray-200 bg-white"
          }`}>
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 text-xs font-bold text-gray-500">{pos + 1}</span>
            <span className="text-sm flex-1">{step.items[itemIdx]}</span>
            {!submitted && (
              <>
                <button onClick={() => onMove(pos, -1)} disabled={pos === 0} className="text-gray-400 hover:text-primary disabled:opacity-30 text-lg">↑</button>
                <button onClick={() => onMove(pos, 1)} disabled={pos === order.length - 1} className="text-gray-400 hover:text-primary disabled:opacity-30 text-lg">↓</button>
              </>
            )}
            {submitted && itemIdx === pos && <span className="text-secondary">✓</span>}
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        {!submitted && <Button variant="secondary" onClick={onCheck}>Check Order</Button>}
        {submitted && <Button variant="ghost" onClick={onRetry}>Try Again</Button>}
      </div>
      {submitted && (
        <div className={`rounded-lg border p-4 ${isCorrect ? "border-secondary bg-secondary/10" : "border-alert bg-alert/5"}`}>
          <p className={`font-semibold ${isCorrect ? "text-secondary" : "text-alert"}`}>
            {isCorrect ? "✅ Perfect! Correct order!" : "❌ Not quite right. Green items are in the right position."}
          </p>
        </div>
      )}
    </div>
  );
}

function QuizView({ step, answers, submitted, onAnswer, onSubmit, onRetake }: {
  step: QuizStep;
  answers: Record<string, number>;
  submitted: boolean;
  onAnswer: (questionId: string, optionIndex: number) => void;
  onSubmit: () => void;
  onRetake: () => void;
}) {
  const passThreshold = step.passThreshold ?? 0.7;
  const correctCount = step.questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const score = step.questions.length > 0 ? correctCount / step.questions.length : 0;
  const passed = submitted && score >= passThreshold;

  return (
    <div className="space-y-6">
      {!submitted ? (
        <>
          {step.questions.map((q, qIdx) => (
            <div key={q.id} className="rounded-lg border border-gray-200 p-4 space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">Question {qIdx + 1} of {step.questions.length}</h4>
              <p className="text-sm text-gray-800">{q.prompt}</p>
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => (
                  <label key={`${q.id}-${oIdx}`} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors ${
                    answers[q.id] === oIdx ? "border-primary bg-primary/5 text-primary font-medium" : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}>
                    <input type="radio" name={`quiz-${q.id}`} checked={answers[q.id] === oIdx}
                      onChange={() => onAnswer(q.id, oIdx)} className="text-primary focus:ring-primary" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <Button onClick={onSubmit} disabled={Object.keys(answers).length < step.questions.length}>Submit Answers</Button>
          </div>
        </>
      ) : (
        <>
          <div className={`rounded-lg border p-4 text-center ${passed ? "border-secondary bg-secondary/10" : "border-alert bg-alert/5"}`}>
            <div className="text-4xl">{passed ? "🎉" : "📚"}</div>
            <h3 className={`mt-2 text-lg font-bold ${passed ? "text-secondary" : "text-alert"}`}>{passed ? "Passed!" : "Keep Studying"}</h3>
            <p className="mt-1 text-sm text-gray-600">{correctCount}/{step.questions.length} correct ({Math.round(score * 100)}%) — Pass: {Math.round(passThreshold * 100)}%</p>
          </div>
          {step.questions.map((q, qIdx) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctIndex;
            return (
              <div key={q.id} className={`rounded-lg border p-4 space-y-3 ${isCorrect ? "border-secondary/50 bg-secondary/5" : "border-alert/50 bg-alert/5"}`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{isCorrect ? "✅" : "❌"}</span>
                  <h4 className="text-sm font-semibold">Question {qIdx + 1}</h4>
                </div>
                <p className="text-sm text-gray-800">{q.prompt}</p>
                <div className="space-y-1 text-sm">
                  {q.options.map((opt, oIdx) => (
                    <div key={`${q.id}-${oIdx}`} className={`rounded px-3 py-2 ${
                      oIdx === q.correctIndex ? "bg-secondary/20 text-secondary font-medium"
                        : oIdx === userAnswer ? "bg-alert/20 text-alert" : "text-gray-500"
                    }`}>
                      {oIdx === q.correctIndex && "✓ "}
                      {oIdx === userAnswer && oIdx !== q.correctIndex && "✗ "}
                      {opt}
                    </div>
                  ))}
                </div>
                <div className="rounded bg-white/50 p-2 text-sm text-gray-700"><strong>Explanation:</strong> {q.explanation}</div>
              </div>
            );
          })}
          <div className="flex justify-center"><Button variant="ghost" onClick={onRetake}>Retake Quiz</Button></div>
        </>
      )}
    </div>
  );
}
