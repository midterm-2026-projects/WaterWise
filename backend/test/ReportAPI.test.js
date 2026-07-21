import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
} from "vitest";


import request
from "supertest";


import express
from "express";


import reportRoutes
from "../routes/reportRoutes.js";





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


mockReports.length = 0;


}

)



})

);







const app =
express();



app.use(
express.json()
);



app.use(
"/api/reports",
reportRoutes
);









describe(
"Report API",
()=>{





beforeEach(()=>{


mockReports.length = 0;


});









it(
"should generate report successfully",
async()=>{



const response =
await request(app)
.post(
"/api/reports/generate"
)
.send({

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
response.status
)
.toBe(201);






expect(
response.body.message
)
.toBe(
"Report generated successfully."
);






expect(
response.body.data
)
.toHaveProperty(
"id"
);



});









it(
"should retrieve generated reports",
async()=>{



await request(app)
.post(
"/api/reports/generate"
)
.send({

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






const response =
await request(app)
.get(
"/api/reports"
);






expect(
response.status
)
.toBe(200);






expect(
response.body.data
)
.toHaveLength(1);



});









it(
"should retrieve report by id",
async()=>{



const createResponse =
await request(app)
.post(
"/api/reports/generate"
)
.send({

type:
"analytics",


startDate:
"2026-07-01",


endDate:
"2026-07-31",


sections:[

"analytics"

],


data:{}

});





const reportId =
createResponse.body.data.id;






const response =
await request(app)
.get(
`/api/reports/${reportId}`
);






expect(
response.status
)
.toBe(200);






expect(
response.body.data.id
)
.toBe(
reportId
);



});









it(
"should download PDF report",
async()=>{





const createResponse =
await request(app)
.post(
"/api/reports/generate"
)
.send({

type:
"consumer",


startDate:
"2026-07-01",


endDate:
"2026-07-31",


sections:[

"consumer"

],


data:{}

});






const reportId =
createResponse.body.data.id;






const response =
await request(app)
.get(
`/api/reports/${reportId}/download`
);






expect(
response.status
)
.toBe(200);






expect(
response.headers[
"content-type"
]
)
.toContain(
"application/pdf"
);



});









it(
"should reject invalid report request",
async()=>{



const response =
await request(app)
.post(
"/api/reports/generate"
)
.send({

type:"",


startDate:"",


endDate:""

});






expect(
response.status
)
.toBe(400);






expect(
response.body.message
)
.toBeDefined();



});





});