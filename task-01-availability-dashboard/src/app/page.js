import Dashboard from "@/components/Dashboard";
import ShaderBackground from "@/components/ShaderBackground";

export default function Home() {
  return (
    <>
      <ShaderBackground />
      <main className="flex-1">
        <Dashboard />
      </main>
    </>
  );
}
