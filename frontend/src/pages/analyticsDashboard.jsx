import AnalyticsTitle from "../components/AnalyticsTitle";

import AdminOverallConsumptionCard from "../components/AdminOverallConsumptionCard";
import AdminMonthlyConsumptionCard from "../components/AdminMonthlyConsumptionCard";
import AdminYearlyConsumptionCard from "../components/AdminYearlyConsumptionCard";
import AdminPerPurokConsumptionCard from "../components/AdminPerPurokConsumptionCard";

import ConsumptionRankingSection from "../components/ConsumptionRankingSection";

import MonthlyConsumptionTrend from "../components/MonthlyConsumptionTrend";
import YearlyConsumptionTrend from "../components/YearlyConsumptionTrend";
import PerPurokConsumptionTrend from "../components/PerPurokConsumptionTrend";
import PurokComparisonChart from "../components/PurokComparisonChart";

import AnomalyRecommendationSection from "../components/AnomalyRecommendationSection";



const AnalyticsDashboard = () => {


  return (

<div
data-testid="analytics-dashboard"
className="
min-h-screen
bg-slate-50
"
>


<main
className="
mx-auto
max-w-7xl
space-y-8
px-6
py-8
"
>


<AnalyticsTitle />







{/* =========================
    CONSUMPTION SUMMARY
========================= */}


<section
aria-label="Consumption summary"
className="
space-y-6
"
>



<div
className="
grid
grid-cols-1
gap-6
md:grid-cols-2
xl:grid-cols-3
"
>


<AdminOverallConsumptionCard />


<AdminMonthlyConsumptionCard />


<AdminYearlyConsumptionCard />


</div>






{/* =========================
    PER PUROK KPI
========================= */}


<AdminPerPurokConsumptionCard />



</section>









{/* =========================
    CONSUMPTION RANKING
========================= */}


<section
aria-label="Consumption ranking"
>


<ConsumptionRankingSection />


</section>









{/* =========================
    CONSUMPTION TRENDS
========================= */}


<section
aria-label="Consumption trends"
className="
space-y-6
"
>


<MonthlyConsumptionTrend />


<YearlyConsumptionTrend />


<PerPurokConsumptionTrend />


<PurokComparisonChart />



</section>









{/* =========================
    AI DECISION SUPPORT
========================= */}


<section
aria-label="AI decision support"
>


<AnomalyRecommendationSection />


</section>







</main>


</div>

  );

};



export default AnalyticsDashboard;