import supabase
from "../config/db.js";




/**
 * Save generated report
 */
export const saveReport =
async({

title,

type,

startDate,

endDate,

sections,

file,

})=>{


const {
data,
error
}
=
await supabase
.from("generated_reports")
.insert({

title,

type,

start_date:startDate,

end_date:endDate,

sections,

pdf_file:file,

})

.select()
.single();





if(error){

throw error;

}



return data;

};







/**
 * Retrieve all reports
 */
export const getReports =
async()=>{


const {

data,

error

}
=
await supabase
.from("generated_reports")
.select(
"*"
)
.order(
"created_at",
{
ascending:false
}
);





if(error){

throw error;

}




return data;


};







/**
 * Retrieve report by ID
 */
export const getReportById =
async(id)=>{


const {

data,

error

}
=
await supabase
.from("generated_reports")
.select(
"*"
)
.eq(
"id",
id
)
.single();





if(error){

return null;

}



return data;


};







/**
 * Retrieve PDF file
 */
export const getReportFile =
async(id)=>{


const report =
await getReportById(
id
);



if(!report){

return null;

}



return report.pdf_file;

};






/**
 * Testing helper
 */
export const clearReports =
async()=>{


await supabase
.from("generated_reports")
.delete()
.neq(
"id",
0
);


};