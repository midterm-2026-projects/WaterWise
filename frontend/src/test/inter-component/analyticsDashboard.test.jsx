import {
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
  vi,
  beforeEach,
} from "vitest";

import {
  MemoryRouter,
} from "react-router-dom";


// Components

import AnalyticsTitle from "../../components/AnalyticsTitle";

import AdminOverallConsumptionCard from "../../components/AdminOverallConsumptionCard";
import AdminMonthlyConsumptionCard from "../../components/AdminMonthlyConsumptionCard";
import AdminYearlyConsumptionCard from "../../components/AdminYearlyConsumptionCard";
import AdminPerPurokConsumptionCard from "../../components/AdminPerPurokConsumptionCard";

import AnomalyAlertCard from "../../components/AnomalyAlertCard";

import ConsumptionRankingSection from "../../components/ConsumptionRankingSection";

import MonthlyConsumptionTrend from "../../components/MonthlyConsumptionTrend";
import YearlyConsumptionTrend from "../../components/YearlyConsumptionTrend";
import PerPurokConsumptionTrend from "../../components/PerPurokConsumptionTrend";

import PurokComparisonChart from "../../components/PurokComparisonChart";

import AnomalyRecommendationSection from "../../components/AnomalyRecommendationSection";

import Sidebar from "../../components/Sidebar";


// Services

import {
  generateAllAnomalies,
} from "../../services/anomalyAPI";


import {
  fetchAllRecommendations,
} from "../../services/recommendationAPI";



// Mock API

vi.mock(
  "../../services/anomalyAPI",
  () => ({
    generateAllAnomalies: vi.fn(),
  }),
);


vi.mock(
  "../../services/recommendationAPI",
  () => ({
    fetchAllRecommendations: vi.fn(),
  }),
);



const renderWithRouter = (
  component,
) => {

  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>,
  );

};



beforeEach(
  () => {

    generateAllAnomalies.mockResolvedValue({
      data: {
        overallMonthly: {
          summary:
            "No anomaly detected.",

          status:
            "normal",
        },
      },
    });


    fetchAllRecommendations.mockResolvedValue({
      data: {
        overallMonthly: {
          recommendations: [],
        },
      },
    });

  },
);





describe(
  "Analytics Dashboard Components tests",
  () => {



    // ==========================================
    // ANALYTICS TITLE
    // ==========================================


    describe(
      "AnalyticsTitle",
      () => {


        it(
          "should render analytics title",
          () => {


            // Arrange

            render(
              <AnalyticsTitle />,
            );


            // Assert

            expect(
              screen.getByText(
                "WaterWise Analytics",
              ),
            )
            .toBeInTheDocument();



            expect(
              screen.getByText(
                "WaterWise Intelligent Decision Support Services",
              ),
            )
            .toBeInTheDocument();


          },
        );


      },
    );






    // ==========================================
    // CONSUMPTION CARDS
    // ==========================================


    describe(
      "Consumption Cards",
      () => {



        it(
          "should render overall consumption card",
          () => {


            render(
              <AdminOverallConsumptionCard />,
            );


            expect(
              screen.getByText(
                "Overall Consumption",
              ),
            )
            .toBeInTheDocument();


          },
        );




        it(
          "should render monthly prediction card",
          async () => {


            render(
              <AdminMonthlyConsumptionCard />,
            );


            expect(
              await screen.findByText(
                "Overall Monthly Prediction",
              ),
            )
            .toBeInTheDocument();


          },
        );





        it(
          "should render yearly prediction card",
          async () => {


            render(
              <AdminYearlyConsumptionCard />,
            );


            expect(
              await screen.findByText(
                "Overall Yearly Prediction",
              ),
            )
            .toBeInTheDocument();


          },
        );





        it(
          "should render per purok prediction card",
          async () => {


            render(
              <AdminPerPurokConsumptionCard />,
            );


            expect(
              await screen.findByText(
                "Per Purok Monthly Predicted Consumption",
              ),
            )
            .toBeInTheDocument();


          },
        );



      },
    );

        // ==========================================
    // ANOMALY ALERT CARD
    // ==========================================


    describe(
      "AnomalyAlertCard",
      () => {



        it(
          "should render default anomaly alert",
          () => {


            render(
              <AnomalyAlertCard />,
            );



            expect(
              screen.getByText(
                "Unknown Area",
              ),
            )
            .toBeInTheDocument();



            expect(
              screen.getByText(
                "No anomaly detected.",
              ),
            )
            .toBeInTheDocument();



            expect(
              screen.getByText(
                "Severity: N/A",
              ),
            )
            .toBeInTheDocument();


          },
        );





        it(
          "should render provided anomaly alert",
          () => {


            render(
              <AnomalyAlertCard

                area="Purok 3"

                message="Unusual water consumption detected."

                severity="High"

              />,
            );



            expect(
              screen.getByText(
                "Purok 3",
              ),
            )
            .toBeInTheDocument();



            expect(
              screen.getByText(
                "Unusual water consumption detected.",
              ),
            )
            .toBeInTheDocument();



          },
        );



      },
    );







    // ==========================================
    // CONSUMPTION RANKING
    // ==========================================


    describe(
      "ConsumptionRankingSection",
      () => {



        it(
          "should render consumption ranking section",
          async () => {


            render(
              <ConsumptionRankingSection />,
            );



            expect(
              await screen.findByText(
                "Consumption Ranking",
              ),
            )
            .toBeInTheDocument();


          },
        );



      },
    );








    // ==========================================
    // MONTHLY CONSUMPTION TREND
    // ==========================================


    describe(
      "MonthlyConsumptionTrend",
      () => {



        it(
          "should render monthly consumption trend",
          () => {


            render(
              <MonthlyConsumptionTrend />,
            );



            expect(
              screen.getByText(
                "Monthly Consumption Trend",
              ),
            )
            .toBeInTheDocument();


          },
        );


      },
    );








    // ==========================================
    // YEARLY CONSUMPTION TREND
    // ==========================================


    describe(
      "YearlyConsumptionTrend",
      () => {



        it(
          "should render yearly consumption trend",
          () => {


            render(
              <YearlyConsumptionTrend />,
            );



            expect(
              screen.getByText(
                "Yearly Consumption Trend",
              ),
            )
            .toBeInTheDocument();


          },
        );


      },
    );








    // ==========================================
    // PER PUROK CONSUMPTION TREND
    // ==========================================


    describe(
      "PerPurokConsumptionTrend",
      () => {



        it(
          "should render per purok consumption trend",
          () => {


            render(
              <PerPurokConsumptionTrend />,
            );



            expect(
              screen.getByText(
                "Per Purok Consumption Trend",
              ),
            )
            .toBeInTheDocument();


          },
        );


      },
    );








    // ==========================================
    // PUROK COMPARISON CHART
    // ==========================================


    describe(
  "PurokComparisonChart",
  () => {


    it(
      "should render purok comparison chart",
      () => {

        render(
          <PurokComparisonChart />
        );


        expect(
          screen.getByText(
            "Purok Comparison Chart"
          )
        )
        .toBeInTheDocument();


      }
    );


  }
);

        // ==========================================
    // ANOMALY RECOMMENDATION SECTION
    // ==========================================


    describe(
      "AnomalyRecommendationSection",
      () => {



        it(
          "should render AI analysis section",
          async () => {


            render(
              <AnomalyRecommendationSection />,
            );



            expect(
              await screen.findByText(
                "AI Analysis",
              ),
            )
            .toBeInTheDocument();



            expect(
              screen.getByText(
                "AI Recommendations",
              ),
            )
            .toBeInTheDocument();


          },
        );





        it(
          "should render overall monthly analysis label",
          async () => {


            render(
              <AnomalyRecommendationSection

                type="overallMonthly"

              />,
            );



            expect(
              await screen.findByText(
                "Overall Monthly Consumption",
              ),
            )
            .toBeInTheDocument();


          },
        );





        it(
          "should render purok monthly analysis label",
          async () => {


            render(
              <AnomalyRecommendationSection

                type="purokMonthly"

                purok="Purok 1"

              />,
            );



            expect(
              await screen.findByText(
                "Purok 1 Monthly Consumption",
              ),
            )
            .toBeInTheDocument();


          },
        );



      },
    );








    // ==========================================
    // SIDEBAR
    // ==========================================


    describe(
      "Sidebar",
      () => {



        it(
          "should render sidebar without crashing",
          () => {


            const {
              container,
            } =
              renderWithRouter(
                <Sidebar />,
              );



            expect(
              container.firstChild,
            )
            .toBeInTheDocument();


          },
        );





        it(
          "should render sidebar content",
          () => {


            const {
              container,
            } =
              renderWithRouter(
                <Sidebar />,
              );



            expect(
              container.textContent,
            )
            .toBeDefined();



            expect(
              container.firstElementChild,
            )
            .not
            .toBeNull();


          },
        );



      },
    );



  },
)
