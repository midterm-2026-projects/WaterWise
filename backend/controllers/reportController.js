import {

  generateReportService,

  fetchReportsService,

  fetchReportByIdService,

} from "../services/reportService.js";



import {

  getReportFile,

} from "../models/aiReportModel.js";






/**
 * Generate Report
 * POST /api/reports/generate
 */
export const generateReport =
async(
req,
res
)=>{


try{


const {

type,

startDate,

endDate,

sections,

data,

}
=
req.body;





const result =
await generateReportService({

type,

startDate,

endDate,

sections,

data,

});





return res.status(201)
.json({

message:
"Report generated successfully.",


data:
result.report,


});



}
catch(error){



return res.status(400)
.json({

message:
error.message,

});


}


};









/**
 * Get Generated Reports
 * GET /api/reports
 */
export const getReports =
async(
req,
res
)=>{


try{


const reports =
await fetchReportsService();



return res.status(200)
.json({

data:
reports,

});


}
catch(error){


return res.status(500)
.json({

message:
"Failed to retrieve reports.",

});


}


};









/**
 * Get Report By ID
 * GET /api/reports/:id
 */
export const getReport =
async(
req,
res
)=>{


try{


const {

id

}
=
req.params;




const report =
await fetchReportByIdService(
id
);




if(!report){


return res.status(404)
.json({

message:
"Report not found.",

});


}




return res.status(200)
.json({

data:
report,

});


}
catch(error){


return res.status(500)
.json({

message:
"Failed to retrieve report.",

});


}


};









/**
 * Download PDF Report
 * GET /api/reports/:id/download
 */
export const downloadReport =
async(
req,
res
)=>{


try{


const {

id

}
=
req.params;





const pdf =
await getReportFile(
id
);





if(!pdf){


return res.status(404)
.json({

message:
"PDF file not found.",

});


}






res.setHeader(

"Content-Type",

"application/pdf"

);



res.setHeader(

"Content-Disposition",

`attachment; filename=report-${id}.pdf`

);





return res.send(
pdf
);



}
catch(error){



return res.status(500)
.json({

message:
"Failed to download report.",

});


}


};