const ride = new Promise((resolve,reject)=>{
    if (arrived) {
        resolve("Yes");
    }else{
        reject("No");
    }
})

ride.then(value=>{
    console.log(value);
}).catch(error=>console.log(error));

const student = new Promise((resolve,reject)=>{
    if (isStudent) {
        resolve("Your are a student.")
    }else{
        reject("Your are not a student")
    }
})

student.then(value=>console.log(value)).catch(error=>console.log(error))

const student1 = ()=>{
    return new Promise((resolve,reject)=>{
        const isStudent = true;
        if (isStudent) {
            resolve("Your are a student.");
        } else {
            reject("Your are a student.");
        }
    })
}

const loadData = async () =>{
    const res = await fetch("");
    const data = await res.json();
    console.log(data);
}

loadData();
