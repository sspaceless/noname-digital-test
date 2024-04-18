import { ConfigProvider } from "antd";
import { NewTaskForm } from "./components";
import { theme } from "antd";
import { useDarkmode } from "./hooks";

const App = () => {
  const { isDarkMode } = useDarkmode();
  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div className="mx-auto mt-6 flex w-96 flex-col justify-center">
        <NewTaskForm onSubmit={undefined} />
      </div>
    </ConfigProvider>
  );
};

export default App;
