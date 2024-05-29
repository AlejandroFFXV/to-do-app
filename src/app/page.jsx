import ToDoAddPage from "@/components/ToDoAdd";
import ToDoGetAll from "@/components/ToDoGetAll";
function HomePage() {
  return (
    <section className="h-[calc(100vh-7rem)] flex items-center justify-center">
      <div>
        <h1 className="text-black text-5xl my-4">To Do App</h1>
        <ToDoAddPage />
        <ToDoGetAll />
      </div>
    </section>
  );
}

export default HomePage;
