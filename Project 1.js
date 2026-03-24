function performanceCsat(agent) {
if (agent.csat >=95){
return "Excellent Performance";}
else if (agent.csat >=90){
return "Good Performance";}
else if (agent.csat >=88)
return "Average Performance";
return "Failed"}

function performanceAct(agent) {
if (agent.act <=375) {
return "Excellent Performance";}
else if (agent.act  <=400) {
return "Good Performance";}
else if (agent.act <=430) {
return "Average Performance";}
return "Failed"}

function performanceRcr(agent) {
if (agent.rcr <=12) {
return "Excellent Performance";}
else if (agent.rcr  <=14) {
return "Good Performance";}
else if (agent.rcr  <=16) {
return "Average Performance";}
return "Failed"}

function performanceAr(agent) {
if (agent.ar === 0) {
return "Excellent Performance";}
else if (agent.ar <=5) {
return "Good Performance";}
else if (agent.ar <=8) {
return "Average Performance";}
return "Failed"}


function individualStats(agent){ 
console.log("Name: " + agent.name);
console.log("CSAT: " + performanceCsat(agent));
console.log("ACT: " + performanceAct(agent));
console.log("RCR: " + performanceRcr(agent));
console.log("AR: " + performanceAr(agent));
}


function overAllRating (agent) { // if csat failed you failed overall but if you passed csat but still failed the other 3 KPI you still failed
if (performanceCsat(agent) === "Failed") {
return "overall failed";   
}
if (performanceAct(agent) === "Failed" &&
    performanceRcr(agent) === "Failed" &&
    performanceAr(agent) === "Failed" 
) {return "overall failed"
} 
return "overall passed"}


const agent = {
name: "Carter Jamot",
csat: 97,
act: 330,
rcr: 12,
ar: 0,
}

individualStats(agent); 
console.log ("Rating: " + overAllRating(agent))

function basicPay (value) {
return (value.basicSalary * value.workingHour);
}
function skillsAllowance (value) {
return (value.skillsPremium * value.workingHour);    
}
function allowance(value) {
return (value.riceAllowance * value.workingHour+
value.clothingAllowance  * value.workingHour + 
value.laundryAllowance * value.workingHour + 
value.mealAllowance * value.workingHour);
}
function beforeDeduction(value){
return (basicPay(value) + 
        skillsAllowance(value) + 
        allowance(value));   
}
function totalAmount(value) {
return (beforeDeduction(value) -
       value.SSS -
        value.pagIbig - 
        value.philhealth - 
        value.tax ) 
};

const value = { 
workingHour:  80,
basicSalary: 70,
skillsPremium:  8,
riceAllowance:  13.33,
clothingAllowance:  3.33,
laundryAllowance:  2,
mealAllowance:  6.34,
SSS: 450,
pagIbig: 200,
philhealth: 100,
tax: 0};

console.log("Estimated Salary: " + totalAmount(value)); 


