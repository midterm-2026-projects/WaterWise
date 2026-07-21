import PDFDocument from "pdfkit";
import {
  saveReport,
  getReports,
  getReportById,
} from "../models/aiReportModel.js";



/**
 * Build report structure
 */
const createReportTemplate = ({
  type,
  sections,
  data,
}) => {


return {

title:
`${type} Report`,


generatedAt:
new Date()
.toISOString(),


sections:
sections || [],


data:

data || {}

};


};





/**
 * Generate PDF Buffer
 */
const generatePDF = (
report
)=>{


return new Promise(
(resolve,reject)=>{


const doc =
new PDFDocument();



const buffers=[];



doc.on(
"data",
(chunk)=>
buffers.push(chunk)
);



doc.on(
"end",
()=>{


const pdfBuffer =
Buffer.concat(
buffers
);


resolve(
pdfBuffer
);


});



doc.on(
"error",
reject
);





doc.fontSize(18)
.text(
report.title
);



doc.moveDown();



doc.fontSize(12)
.text(
`Generated Date: ${report.generatedAt}`
);



doc.moveDown();



report.sections.forEach(
(section)=>{


doc.fontSize(14)
.text(
section.toUpperCase()
);



doc.fontSize(11)
.text(

JSON.stringify(
report.data[section] || {},
null,
2

)

);



doc.moveDown();


});


doc.end();



}

);


};






/**
 * Generate Complete Report
 */
export const generateReportService =
async({
type,
startDate,
endDate,
sections,
data,
})=>{


if(
!type ||
!startDate ||
!endDate
){

throw new Error(
"Report type and date range are required."
);

}



const template =
createReportTemplate({

type,

sections,

data

});



const pdf =
await generatePDF(
template
);



const savedReport =
await saveReport({

title:
template.title,


type,

startDate,

endDate,


sections,


file:
pdf,


});


return {

report:
savedReport,


pdf

};


};







export const fetchReportsService =
async()=>{


return await getReports();


};






export const fetchReportByIdService =
async(
id
)=>{


return await getReportById(
id
);

};