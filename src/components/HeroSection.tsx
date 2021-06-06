import './HeroSection.css';

function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/videos/video-2.mp4" autoPlay loop muted />
      <h1>Welcome to PicSpy</h1>
      <p>Challenge yourself to code to find the patterns in the image !</p>
    </div>
  );
}

export default HeroSection;
