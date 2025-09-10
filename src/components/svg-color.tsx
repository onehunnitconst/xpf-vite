type SvgColorProps = {
  src: string;
  className?: string;
  width: number;
  height: number;
  color?: string;
};

export default function SvgColor({
  src,
  width,
  height,
  color,
  className = "",
}: SvgColorProps) {
  return (
    <span
      className={className}
      style={{
        width,
        height,
        display: "inline-block",
        backgroundColor: color,
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
      }}
    />
  );
}
