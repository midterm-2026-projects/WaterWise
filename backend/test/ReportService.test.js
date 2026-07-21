import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
} from "vitest";



import {

  generateReportService,

  fetchReportsService,

} from "../services/reportService.js";





/*
 Mock database layer
*/
const mockReports = [];



vi.mock(
"../models/aiReportModel.js",
()=>({


saveReport:
vi.fn(
async(report)=>{


const saved = {

id:
mockReports.length + 1,


...report,


created_at:
new Date()
.toISOString()


};


mockReports.push(
saved
);


return saved;


}
),



getReports:
vi.fn(
async()=>mockReports
),



getReportById:
vi.fn(
async(id)=>
mockReports.find(
item =>
item.id === Number(id)
)
),



getReportFile:
vi.fn(
async(id)=>{

const report =
mockReports.find(
item =>
item.id === Number(id)
);


return report?.file;

}

),



clearReports:
vi.fn(
()=>{

mockReports.length=0;

}

)



})

);





describe(
"Report Service",
()=>{





beforeEach(()=>{


mockReports.length=0;


});









it(
"should generate report successfully",
async()=>{



const result =
await generateReportService({

type:
"consumption",


startDate:
"2026-07-01",


endDate:
"2026-07-31",


sections:[

"summary",

"analytics"

],


data:{


summary:{

totalConsumption:
500

}


}


});





expect(
result
)
.toBeDefined();





expect(
result.report
)
.toBeDefined();





expect(
result.report.title
)
.toBe(
"consumption Report"
);





expect(
result.pdf
)
.toBeDefined();



});









it(
"should save generated reports successfully",
async()=>{



await generateReportService({

type:
"billing",


startDate:
"2026-07-01",


endDate:
"2026-07-31",


sections:[

"billing"

],


data:{}

});





const reports =
await fetchReportsService();





expect(
reports
)
.toHaveLength(1);





expect(
reports[0].type
)
.toBe(
"billing"
);



});









it(
"should reject missing report type",
async()=>{



await expect(

generateReportService({

startDate:
"2026-07-01",


endDate:
"2026-07-31",


sections:[

"summary"

],


data:{}

})

)
.rejects
.toThrow();



});









it(
"should reject missing start date",
async()=>{



await expect(

generateReportService({

type:
"analytics",


endDate:
"2026-07-31",


sections:[

"analytics"

],


data:{}

})

)
.rejects
.toThrow();



});









it(
"should reject missing end date",
async()=>{



await expect(

generateReportService({

type:
"analytics",


startDate:
"2026-07-01",


sections:[

"analytics"

],


data:{}

})

)
.rejects
.toThrow();



});



});