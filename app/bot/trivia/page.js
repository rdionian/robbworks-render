"use client";
import { useState, useEffect } from "react";


export default function TriviaBuilder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quizName, setQuizName] = useState("");
  const [quizCode, setQuizCode] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [recentQuizzes, setRecentQuizzes] = useState([]);

  const fetchQuestions = async (loadMore = false) => {
    setLoading(true);
    try {
      const currentOffset = loadMore ? offset : 0;
      const url = `/api/trivia/questions?category=${selectedCategory}&search=${searchTerm}&limit=20&offset=${currentOffset}`;
      const res = await fetch(url);
      const data = await res.json();
      if (loadMore) {
        setQuestions((prev) => [...prev, ...(data.questions || [])]);
      } else {
        setQuestions(data.questions || []);
      }
      setHasMore(data.hasMore ?? false);
      setOffset(currentOffset + 20);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentQuizzes = async () => {
    try {
      const res = await fetch("/api/trivia/recent-quizzes");
      const data = await res.json();
      setRecentQuizzes(data.quizzes || []);
    } catch (error) {
      console.error("Failed to fetch recent quizzes:", error);
    }
  };

  useEffect(() => {
    setOffset(0);
    fetchQuestions(false);
    fetchRecentQuizzes();
  }, [selectedCategory, searchTerm]);

  const handleSelectQuestion = (question) => {
    if (selectedQuestions.find((q) => q.id === question.id)) {
      setSelectedQuestions(selectedQuestions.filter((q) => q.id !== question.id));
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleRemoveQuestion = (questionId) => {
    setSelectedQuestions(selectedQuestions.filter((q) => q.id !== questionId));
  };

  const handleGenerateQuiz = async () => {
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    try {
      const dbQuestions = selectedQuestions.filter((q) => typeof q.id === "number");
      const customQuestions = selectedQuestions.filter((q) => typeof q.id === "string" && q.id.startsWith("custom-"));
      const res = await fetch("/api/trivia/save-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          name: quizName.trim() || "Untitled Quiz",
          questionIds: dbQuestions.map((q) => q.id),
          customQuestions: customQuestions.map((q) => ({
            id: q.id,
            question: q.question,
            options: q.options,
            correctindex: q.correctindex,
            category: q.category,
          })),
          createdBy: "Website User",
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        alert("Failed to save quiz: " + (error.error || "Unknown error"));
        return;
      }
      setQuizCode(code);
      setQuizName("");
      setSelectedQuestions([]);
      fetchRecentQuizzes();
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate quiz code. Please try again.");
    }
  };

  const handleAddCustomQuestion = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const question = formData.get("question");
    const options = ["option1", "option2", "option3", "option4"]
      .map((k) => formData.get(k))
      .filter((o) => o && o.trim() !== "");
    const correctAnswer = parseInt(formData.get("correctAnswer"));

    if (options.length < 2) {
      alert("Please provide at least 2 options");
      return;
    }
    if (correctAnswer < 1 || correctAnswer > options.length) {
      alert(`Correct answer must be between 1 and ${options.length}`);
      return;
    }

    setSelectedQuestions([
      ...selectedQuestions,
      {
        id: `custom-${Date.now()}`,
        question,
        options: options.join("|"),
        correctindex: correctAnswer - 1,
        category: "Custom",
      },
    ]);
    e.target.reset();
    alert("Custom question added to your quiz!");
  };

  const inputClass = "w-full bg-black/30 border border-[#b8ff9a]/30 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#b8ff9a]/60 placeholder:text-[#666]";

  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/projects/google-play/volcano-jumper", label: "Mobile" },
    { href: "/#development", label: "Development" },
    { href: "/bot", label: "Discord Bot", active: true },
    { href: "/web-development", label: "Web Dev" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Navigation */}
      <nav className="bg-black border-b border-white/10 relative max-[768px]:hidden">
        <a href="/" className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 no-underline">
          <img src="/logo.png" alt="RobbWorks" className="h-7 w-auto" />
          <span className="text-white font-bold text-[0.9rem] tracking-[0.02em]">robbworks</span>
        </a>
        <ul className="list-none flex justify-center flex-wrap gap-0 py-4 m-0 p-0">
          {navLinks.map((item) => (
            <li key={item.href} className="mx-4">
              <a
                href={item.href}
                className={`no-underline font-bold text-[0.9rem] tracking-[0.02em] transition-colors ${item.active ? "text-[#7ab35e]" : "text-[#444] hover:text-white"}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="py-16 px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-[3rem] text-[#b8ff9a] mt-0 mb-3">Trivia Quiz Builder</h1>
            <p className="text-[#ccc] text-[1.1rem] m-0">
              Search questions, select your favorites, or add custom ones to create your quiz
            </p>
            <div className="w-[600px] max-w-full h-1 bg-[#b8ff9a] mx-auto rounded-sm mt-6" />
          </div>

          {/* Layout */}
          <div className="flex gap-8 max-[900px]:flex-col">
            {/* Left — Browse */}
            <div className="flex-1 min-w-0">
              {/* Search + filter */}
              <div className="flex gap-3 mb-4 max-[600px]:flex-col">
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className={inputClass + " cursor-pointer"}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="Geography">Geography</option>
                  <option value="Books">Books</option>
                  <option value="Math">Math</option>
                  <option value="Anime">Anime</option>
                  <option value="Music">Music</option>
                  <option value="General Knowledge">General Knowledge</option>
                </select>
              </div>

              {/* Questions list */}
              <div className="bg-[rgba(20,20,30,0.6)] border border-[#b8ff9a]/20 rounded-xl overflow-hidden mb-4">
                {loading && questions.length === 0 ? (
                  <div className="text-center text-[#888] p-8">Loading questions...</div>
                ) : questions.length === 0 ? (
                  <div className="text-center text-[#888] p-8">No questions found. Try adjusting your filters.</div>
                ) : (
                  <div className="max-h-[500px] overflow-y-auto">
                    {questions.map((q) => {
                      const options = q.options.split(",").map((o) => o.trim());
                      const isSelected = selectedQuestions.some((sq) => sq.id === q.id);
                      return (
                        <div
                          key={q.id}
                          className={`flex items-start gap-3 p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${isSelected ? "bg-[#b8ff9a]/5" : ""}`}
                          onClick={() => handleSelectQuestion(q)}
                        >
                          <input
                            type="checkbox"
                            className="mt-1 accent-[#b8ff9a] flex-shrink-0"
                            checked={isSelected}
                            onChange={() => handleSelectQuestion(q)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="min-w-0">
                            <p className="text-white text-sm m-0 mb-1 leading-snug">{q.question}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              {q.category && (
                                <span className="text-[0.7rem] bg-[#b8ff9a]/10 text-[#b8ff9a] px-2 py-0.5 rounded-full border border-[#b8ff9a]/20">
                                  {q.category}
                                </span>
                              )}
                              <span className="text-[#666] text-[0.75rem]">{options.length} options</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {hasMore && (
                <button
                  className="w-full py-3 bg-transparent border border-[#b8ff9a]/30 text-[#b8ff9a] rounded-lg font-semibold hover:bg-[#b8ff9a]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-8"
                  onClick={() => fetchQuestions(true)}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More Questions"}
                </button>
              )}

              {/* Recent Quizzes */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-[1.25rem] text-[#b8ff9a] mb-4 mt-0">Recent Quizzes</h3>
                <div className="max-h-[400px] overflow-y-auto flex flex-col gap-3 pr-1">
                  {recentQuizzes.length === 0 ? (
                    <div className="text-center text-[#666] text-sm p-4">No quizzes yet</div>
                  ) : (
                    recentQuizzes.map((quiz) => (
                      <div
                        key={quiz.code}
                        className="bg-black/20 rounded-md p-3 border border-white/10 hover:border-[#b8ff9a]/30 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-white flex-1">{quiz.name}</span>
                          <span
                            className="bg-[rgba(0,191,255,0.2)] text-[#00bfff] px-2 py-1 rounded text-[0.75rem] font-mono cursor-pointer ml-2 hover:bg-[rgba(0,191,255,0.3)] transition-colors"
                            onClick={() => {
                              navigator.clipboard.writeText(quiz.code);
                              alert(`Code ${quiz.code} copied!`);
                            }}
                            title="Click to copy"
                          >
                            {quiz.code}
                          </span>
                        </div>
                        <div className="text-[0.75rem] text-[#888]">
                          {quiz.question_count} questions • {new Date(quiz.createdat).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right — Builder Panel */}
            <div className="w-[340px] max-[900px]:w-full flex flex-col gap-6">
              {/* Selected Questions */}
              <div className="bg-[rgba(20,20,30,0.6)] border border-[#b8ff9a]/20 rounded-xl p-6">
                <h3 className="text-[1.1rem] text-[#b8ff9a] mt-0 mb-1">Selected Questions</h3>
                <p className="text-[#888] text-sm mb-4">{selectedQuestions.length} questions selected</p>
                <div className="max-h-[200px] overflow-y-auto flex flex-col gap-2">
                  {selectedQuestions.length === 0 ? (
                    <div className="text-center text-[#666] text-sm p-4">No questions selected yet</div>
                  ) : (
                    selectedQuestions.map((q) => (
                      <div key={q.id} className="flex justify-between items-center gap-2 bg-black/20 rounded-md px-3 py-2">
                        <span className="text-[#ccc] text-sm truncate">{q.question.substring(0, 40)}...</span>
                        <button
                          className="text-[#ff6b6b] bg-transparent border-none cursor-pointer text-lg leading-none flex-shrink-0 hover:text-red-400 transition-colors"
                          onClick={() => handleRemoveQuestion(q.id)}
                        >
                          ×
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Add Custom Question */}
              <div className="bg-[rgba(20,20,30,0.6)] border border-[#b8ff9a]/20 rounded-xl p-6">
                <h3 className="text-[1.1rem] text-[#b8ff9a] mt-0 mb-4">Add Custom Question</h3>
                <form className="flex flex-col gap-3" onSubmit={handleAddCustomQuestion}>
                  <input type="text" className={inputClass} placeholder="Question text" name="question" required />
                  <div className="flex flex-col gap-2">
                    <input type="text" className={inputClass} placeholder="Option 1" name="option1" required />
                    <input type="text" className={inputClass} placeholder="Option 2" name="option2" required />
                    <input type="text" className={inputClass} placeholder="Option 3 (optional)" name="option3" />
                    <input type="text" className={inputClass} placeholder="Option 4 (optional)" name="option4" />
                  </div>
                  <input type="number" className={inputClass} placeholder="Correct answer (1-4)" name="correctAnswer" min="1" max="4" required />
                  <button
                    type="submit"
                    className="py-2.5 bg-[#b8ff9a]/10 border border-[#b8ff9a]/40 text-[#b8ff9a] rounded-lg font-semibold hover:bg-[#b8ff9a]/20 transition-colors"
                  >
                    Add to Quiz
                  </button>
                </form>
              </div>

              {/* Quiz Name + Generate */}
              <div className="bg-[rgba(20,20,30,0.6)] border border-[#b8ff9a]/20 rounded-xl p-6">
                <h3 className="text-[1.1rem] text-[#b8ff9a] mt-0 mb-3">Quiz Name</h3>
                <input
                  type="text"
                  className={inputClass + " mb-4"}
                  placeholder="Name your quiz (optional)"
                  value={quizName}
                  onChange={(e) => setQuizName(e.target.value)}
                />

                {!quizCode ? (
                  <button
                    className="w-full py-3 bg-[#b8ff9a] text-black rounded-lg font-bold text-base hover:bg-[#a0ef84] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={handleGenerateQuiz}
                    disabled={selectedQuestions.length === 0}
                  >
                    Generate Quiz Code
                  </button>
                ) : (
                  <>
                    <div className="text-center mb-4">
                      <p className="text-[#b8ff9a] font-semibold mb-2">Your Quiz Code:</p>
                      <div className="text-[2.5rem] font-mono font-bold text-[#b8ff9a] tracking-[0.2em] bg-black/30 rounded-xl py-4 mb-3">
                        {quizCode}
                      </div>
                      <p className="text-[#888] text-sm m-0">
                        Use in Discord:{" "}
                        <code className="bg-black/30 text-[#b8ff9a] px-2 py-0.5 rounded font-mono">
                          !loadquiz {quizCode}
                        </code>
                      </p>
                    </div>
                    <button
                      className="w-full py-3 bg-transparent border border-[#b8ff9a]/40 text-[#b8ff9a] rounded-lg font-semibold hover:bg-[#b8ff9a]/10 transition-colors"
                      onClick={() => setQuizCode(null)}
                    >
                      Create Another Quiz
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-[#b8ff9a] mt-10" />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-16 pb-8 bg-black/20 relative text-center">
        <a href="/privacy-policy" className="absolute bottom-3 right-4 text-[#444] no-underline text-[0.7rem]">Privacy Policy</a>
        <p className="text-[1.1rem] mb-2 text-[#ccc]">rob@robbworks.dev</p>
        <div className="flex justify-center items-center gap-4 mt-3">
          <a href="https://www.linkedin.com/in/robert-dionian-a08739235" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ab35e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a href="https://www.instagram.com/robbworks.dev" target="_blank" rel="noopener noreferrer" title="Instagram" className="inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ab35e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="18" cy="6" r="1" />
            </svg>
          </a>
          <a href="https://www.youtube.com/@RobbWorks" target="_blank" rel="noopener noreferrer" title="YouTube" className="inline-flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ab35e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
          </a>
        </div>
        <p className="text-[0.8rem] text-[#666] mt-4">© 2025 Robert Dionian. Built with Next.js.</p>
      </footer>
    </>
  );
}
