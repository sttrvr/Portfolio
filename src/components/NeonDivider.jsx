export default function NeonDivider() {
  return (
    <div className="relative mx-auto my-12 h-px w-full max-w-6xl">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent opacity-60" />
    </div>
  )
}
