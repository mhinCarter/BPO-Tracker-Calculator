const allData = {
agent: {
name: "Carter Jamot",
csat: 97,
act: 330,
rcr: 12,
ar: 0,
},

metricRules: {
csat: {
direction: "high",
excellent: 95,
good: 90, 
average: 88
},
act: { 
direction: "low",
excellent: 375,
good: 400, 
average: 430
},
rcr: {
direction: "low",
excellent: 12,
good: 14, 
average: 16
},
ar: {
direction: "low",
excellent: 0,
good: 5, 
average: 8
}},

performanceLabel:  {
excellent: "Excellent Performance",
good: "Good Performance",
average: "Average Performance",
failed: "Failed",
overallPassed: "Overall Passed",
overallFailed: "Overall Failed"
}}


function performance(allData,metric) {
const {agent, metricRules, performanceLabel} = allData
const {excellent, good, average, failed,} = performanceLabel
const value = agent[metric]
const rule = metricRules[metric]
if (!rule) {
return "Invalid Input"}

if (rule.direction === "high"){
if (value >= rule.excellent) return excellent;
if (value >= rule.good) return good;
if (value >= rule.average) return average;
return failed;
}
if (rule.direction === "low"){
if (value <= rule.excellent) return excellent;
if (value <= rule.good) return good;
if (value <= rule.average) return average;
return failed;
}}

function overallRating (allData) { // if csat failed you failed overall but if you passed csat but still failed the other 3 KPI you still failed
const {failed, overallPassed, overallFailed} = allData.performanceLabel
const csatResult = performance(allData, "csat"); 
const actResult = performance(allData, "act");
const rcrResult = performance(allData,"rcr")
const arResult = performance(allData,"ar") 
if (csatResult === failed) {
return overallFailed
}
if (actResult === failed &&
rcrResult === failed &&
arResult === failed ){
return overallFailed;}
return overallPassed
}
function individualMetricResult(allData){
const metrics = ["csat", "act", "rcr", "ar"]
metrics.forEach(metric => 
{console.log(`${metric.toUpperCase()}: ${performance(allData,metric)}`)    
});
}

individualMetricResult(allData)
console.log(overallRating(allData));


function sumValues(obj){
return Object.values(obj).reduce((sum, val) => sum + val, 0)
}
function basicPay (employee) {
const {basicSalary, skillsPremium, workingHour} = employee;
return ((basicSalary + skillsPremium)* workingHour);
}
function totalAllowance(employee) {
const {allowances, workingHour} = employee
return sumValues(allowances) * workingHour
}
function grossPay(employee){
return (basicPay(employee) + totalAllowance(employee));   
}
function netPay(employee) {
const {deductions} = employee;
return grossPay(employee) - sumValues(deductions);
};
const pesoFormatter = new Intl.NumberFormat('en-PH', {
style: 'currency',
currency: 'PHP'
});


const employee = { 
workingHour:  95,
basicSalary: 70,
skillsPremium:  8,

allowances: {
riceAllowance:  13.33,
clothingAllowance:  3.33,
laundryAllowance:  2,
mealAllowance:  6.34,
},
deductions: {
SSS: 450,
pagIbig: 200,
philhealth: 100,
tax: 0
}}

console.log("Total Amount: " + pesoFormatter.format(netPay(employee))); 


const survey = {
csat: 34,
dsat: 1,
target: 98
}; 

function totalSurvey(survey) { 
const {csat,dsat} = survey;
if (Number.isFinite(csat) && Number.isFinite(dsat) &&
csat >= 0 && dsat >= 0){
return (csat + dsat)} 
return null 
}
function surveyPercentage(survey){
const {csat} = survey
const total = totalSurvey(survey)
if (total !== null && total !== 0 ){      
return ((csat / total) * 100)  
} return null
}
function targetCsatInDecimal(survey) {
const {target} = survey
if (Number.isFinite(target) && target > 0 && target < 100) {
return target / 100
} return null
}
function calculateAdditionalCsat(survey){
const {csat} = survey;
const total = totalSurvey(survey);
const target = targetCsatInDecimal(survey); 
if (target !== null && total !== 0 && total !== null) {
return Math.max(0,Math.ceil
    ((((target * total) - csat) / 
    (1 - target))))
} return null
} 

function result(){
console.log("Survey Percentage: " + surveyPercentage(survey));
console.log("Rounded Target Csat: " + calculateAdditionalCsat(survey)); 
}

result()



const scheduleAndTime = {
schedule: {
timeIn: new Date("2026-03-28T02:30:00+08:00"),
timeOut: new Date("2026-03-28T11:30:00+08:00"),
tomorrowTimeIn: new Date("2026-03-29T01:00:00+08:00"),
},
time: {
prep: 1,
travelToOffice: 1.5,
travelToHome:1.5,
overTime: 0,
dinnerTime: 0.5,
otherActivities: 0,
},
unpaidTime: {
lunch: 1,
vto: 0
}}

const MS_PER_HOUR= 1000 * 60 * 60;

function converter(msTime){
if (msTime <= 0 ) return null;
const totalMinutes = Math.floor(msTime / (1000 * 60))
const hours = Math.floor(totalMinutes / 60);
const minutes = totalMinutes % 60; 
return `${hours}H ${minutes}M`; 
}

function paidWorkDuration (scheduleAndTime) { // I want to show how many working hours has been made that day because sometimes most people applied for VTO to have early out
const {timeOut, timeIn,} = scheduleAndTime.schedule;
const {lunch,vto} = scheduleAndTime.unpaidTime;
const msDuration = (timeOut - timeIn) - ((lunch * MS_PER_HOUR) + (vto  * MS_PER_HOUR)) ;
return msDuration
}

function calculateRestTime (scheduleAndTime) {
const {timeOut, tomorrowTimeIn} = scheduleAndTime.schedule
const {prep,travelToOffice,travelToHome,overTime,dinnerTime,otherActivities} = scheduleAndTime.time
const timeAfterDuty = timeOut.getTime() + 
((overTime * MS_PER_HOUR) + 
(travelToHome  * MS_PER_HOUR )+ 
(dinnerTime  * MS_PER_HOUR) + 
(otherActivities * MS_PER_HOUR ));
const timeBeforeDuty = tomorrowTimeIn.getTime() -
((prep  * MS_PER_HOUR ) + 
(travelToOffice * MS_PER_HOUR)); 
const msRest = timeBeforeDuty - timeAfterDuty;
return msRest
}

function main () {
const workMs = paidWorkDuration(scheduleAndTime);
const restMs = calculateRestTime(scheduleAndTime);

const formattedWork = converter(workMs);
const formattedRest = converter(restMs);

console.log(formattedWork ? `Paid Hours: ${formattedWork}` : "Invalid Input");
console.log(formattedRest ? `Total Rest Time: ${formattedRest}` : "Invalid Input");
}
main(); 