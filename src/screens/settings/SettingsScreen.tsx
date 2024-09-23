import Input from "@/components/v2/Input";
import CreditInformation from "./sections/CreditInformation";

const SettingsScreen = () => {
  return (
    <div className="w-screen h-screen bg-white relative">
      {/* Green layer */}
      <div className="w-full bg-[#24C69E] h-[235px] rounded-b-2xl relative" />
      <div className="absolute top-5 left-[10px] bg-[white] shadow w-[calc(100%-64px)] h-[calc(100%-64px)] rounded-2xl flex flex-col gap-5 m-6 p-8">
        <h2 className="font-medium text-[24px]">Account Settings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto scrollable-container">
          <CreditInformation />

          <div className="xl:col-span-2 border border-[#E5EAEE] p-4 rounded-lg flex flex-col gap-4">
            <h3 className="text-[20px]">API Keys</h3>
            <Input title="Open AI" />
            <Input title="Anthropic" />
            <Input title="Google Generative AI" />
            <Input title="Mistral" />
            <Input title="Fireworks" />
            <Input title="Grooq" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;