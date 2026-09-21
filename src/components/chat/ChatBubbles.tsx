const BUBBLES = [
  { left: "6%", size: 40, delay: "0s", duration: "10s" },
  { left: "16%", size: 22, delay: "1.2s", duration: "8s" },
  { left: "27%", size: 56, delay: "2.4s", duration: "12s" },
  { left: "38%", size: 30, delay: "0.5s", duration: "9s" },
  { left: "50%", size: 46, delay: "3.1s", duration: "10.5s" },
  { left: "62%", size: 20, delay: "1.7s", duration: "7.5s" },
  { left: "73%", size: 62, delay: "3.8s", duration: "13s" },
  { left: "84%", size: 32, delay: "0.9s", duration: "9.5s" },
  { left: "93%", size: 24, delay: "2.1s", duration: "8.4s" },
];

export function ChatBubbles() {
  return (
    <div className="chat-bubbles">
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
    </div>
  );
}
