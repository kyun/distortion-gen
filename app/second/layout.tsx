import "~/app/second/layout.css";
interface Props {
  children: React.ReactNode;
}
export default function SecondLayout({ children }: Props) {
  return (
    <div>
      <h1>seconds</h1>
      {children}
    </div>
  );
}
