import ConsumerInfoGrid from '../components/ConsumerInfoGrid';
import CurrentBalanceCard from '../components/CurrentBalanceCard';
import MonthlyConsumptionWidget from '../components/MonthlyConsumptionWidget';

export default function ConsumerProfilePanel({ consumer }) {
  if (!consumer) {
    return <div className="p-6 text-center text-gray-500">No profile selection active.</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-gray-50 rounded-2xl shadow-inner">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Consumer Profile</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ConsumerInfoGrid 
          name={consumer.name} 
          purok={consumer.purok} 
          houseNumber={consumer.houseNumber} 
        />
        <CurrentBalanceCard 
          amountDue={consumer.activeAmountDue} 
        />
        <MonthlyConsumptionWidget 
          month={consumer.latestMonth} 
          usage={consumer.volumetricUsage} 
        />
      </div>
    </div>
  );
}