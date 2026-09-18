import React, { useState } from "react";

type Memory = {
  title: string;
  date: string;
  caption: string;
  emoji: string;
};

const memories: Memory[] = [
  {
    title: "The Beginning",
    date: "Day 1",
    caption: "The day our story quietly started.",
    emoji: "🌷",
  },
  {
    title: "Our First Memory",
    date: "A little later",
    caption: "One of those moments I wish I could replay.",
    emoji: "🧸",
  },
  {
    title: "The Random Days",
    date: "Somewhere between",
    caption: "The ordinary days somehow became my favourite ones.",
    emoji: "☁️",
  },
  {
    title: "365 Days",
    date: "One whole year",
    caption: "365 days of us. And somehow, it still feels like the beginning.",
    emoji: "❤️",
  },
];

export default function Scene8MemoryWall() {
  const [selected, setSelected] = useState<Memory | null>(null);

  return (
    <section className="memory-wall">
      <div className="memory-wall-header">
        <span className="memory-kicker">A LITTLE WALL OF US</span>

        <h1>Some moments<br />I want to keep forever.</h1>

        <p>
          Not every memory needs a photograph.
          Some of them just need a place to stay.
        </p>
      </div>

      <div className="memory-grid">
        {memories.map((memory, index) => (
          <button
            key={memory.title}
            className={`memory-card memory-card-${index + 1}`}
            onClick={() => setSelected(memory)}
          >
            <div className="memory-card-inner">
              <span className="memory-emoji">{memory.emoji}</span>

              <div>
                <span className="memory-date">{memory.date}</span>
                <h2>{memory.title}</h2>
                <p>{memory.caption}</p>
              </div>

              <span className="memory-arrow">↗</span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="memory-modal"
          onClick={() => setSelected(null)}
        >
          <div
            className="memory-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="memory-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>

            <span className="memory-modal-emoji">
              {selected.emoji}
            </span>

            <span className="memory-date">
              {selected.date}
            </span>

            <h2>{selected.title}</h2>

            <p>{selected.caption}</p>

            <button
              className="memory-back"
              onClick={() => setSelected(null)}
            >
              back to our memories
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
