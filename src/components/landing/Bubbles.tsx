const BUBBLES = [
  { left: "4%", size: 46, delay: "0s", duration: "9s" },
  { left: "12%", size: 26, delay: "1.4s", duration: "7.5s" },
  { left: "20%", size: 64, delay: "2.6s", duration: "11s" },
  { left: "29%", size: 34, delay: "0.6s", duration: "8.2s" },
  { left: "38%", size: 52, delay: "3.4s", duration: "9.6s" },
  { left: "47%", size: 22, delay: "1.9s", duration: "6.8s" },
  { left: "55%", size: 70, delay: "4.2s", duration: "12s" },
  { left: "63%", size: 38, delay: "0.9s", duration: "8.8s" },
  { left: "71%", size: 30, delay: "2.2s", duration: "7s" },
  { left: "79%", size: 58, delay: "3.8s", duration: "10.4s" },
  { left: "87%", size: 24, delay: "1.1s", duration: "7.9s" },
  { left: "94%", size: 44, delay: "2.9s", duration: "9.2s" },
];

export function Bubbles() {
  return (
    <section className="bubble-field">
      {BUBBLES.map((bubble, index) => (
        <span
          key={index}
          className="bubble"
          aria-hidden="true"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDelay: bubble.delay,
            animationDuration: bubble.duration,
          }}
        />
      ))}
      <div className="bubble-copy">
        <h2>Ideas rise, answers surface.</h2>
        <p>Every question you ask ripples through the knowledge base and floats back with a grounded, cited answer.</p>
      </div>
    </section>
  );
}
