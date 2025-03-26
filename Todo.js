flatpickr("input[type=date-time]", {
    enableTime: true,
    dateFormat: "h:S K, F j",
});

document.addEventListener("DOMContentLoaded",()=>{
    const storedtasks=JSON.parse(localStorage.getItem("task"));

    if(storedtasks){
        storedtasks.forEach((tasks)=> task.push(tasks));
        updatetasklist();
        updatestats();
    }
});

let task=[];

const savetasks=()=>{
    localStorage.setItem("task",JSON.stringify(task));
}


const addtask=()=>{
    const taskname=document.getElementById("taskname");
    const text=taskname.value.trim();
    const datetime=document.getElementById("time");
    const time=datetime.value;

    if(text&&time){
        task.push({text:text,completed:false,time:time});
        taskname.value="";
        updatetasklist();
        updatestats();
        savetasks();
    }
    else{
        alert("Please enter the task and time");
    }
}


const toggletaskcomplete=(index)=>{
    task[index].completed=!task[index].completed;
    updatestats();
    savetasks();
}

const deletetask=(index)=>{
    task.splice(index,1);
    updatetasklist();
    updatestats();
    savetasks();
}

const edittask=(index)=>{
    const input= document.getElementById("taskname");
    input.value=task[index].text;

    task.splice(index,1);
    updatetasklist();
    updatestats();
    savetasks();
}

const updatestats=()=>{
    const completetasks=task.filter(tasks=>tasks.completed).length;
    const totaltasks=task.length;
    const progress=(completetasks/totaltasks)*100;
    
    const progressbar=document.getElementById("progress");
    progressbar.style.width=`${progress}%`;

    const taskcount=document.getElementById("progresscircle");
    taskcount.innerText=`${completetasks}/${totaltasks}`;
    
    if(completetasks===totaltasks&&totaltasks>0){
        endceleb();
        taskcount.style.backgroundImage="url(done.png)";
        taskcount.innerText="";
    }
};

const updatetasklist=()=>{
    const tasklist=document.getElementById("tasklist");
    tasklist.innerHTML="";

    task.forEach((tasks,index)=>{
        const listitem=document.createElement("li");

        listitem.innerHTML=`
            <div class="task" id="t1">
                <div class="task ${tasks.completed ? "completed" : "" }">
                <input type="checkbox" class="checkbox" ${tasks.completed ? "checked":""} onClick="midceleb()"/>
                <p class="tasknam">${tasks.text}</p>
                <div class="taskdatetime">${tasks.time}</div>
                <button class="edittask" onClick="edittask(${index})"></button>
                <button class="deletetask" onClick="deletetask(${index})"></button>
                </div>
            </div>
            `;

            listitem.addEventListener("change", ()=>{
                toggletaskcomplete(index);
            });
            tasklist.append(listitem);
    });
};

document.getElementById("addtask").addEventListener("click",function(add){
   add.preventDefault();

   addtask();
})






const endceleb=()=>{
    
const duration = 15 * 1000,
animationEnd = Date.now() + duration,
defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
const timeLeft = animationEnd - Date.now();

if (timeLeft <= 0) {
  return clearInterval(interval);
}

const particleCount = 50 * (timeLeft / duration);

// since particles fall down, start a bit higher than random
confetti(
  Object.assign({}, defaults, {
    particleCount,
    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
  })
);
confetti(
  Object.assign({}, defaults, {
    particleCount,
    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
  })
);
}, 250);
};




const midceleb=()=>{
const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
};