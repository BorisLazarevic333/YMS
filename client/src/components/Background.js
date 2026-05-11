function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-white opacity-20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-white opacity-10 blur-3xl rounded-full"></div>

      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white opacity-5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}

export default Background;
