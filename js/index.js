//Varun Dewan 2019
var data = [
   {
      title: 'work on web app',
      last: false
   },
   {
      title: 'upload project files',
      last: false
   }
]

var $ = function(selector){ 
   var ele = document.querySelectorAll(selector);
   for(var i = 0; i < ele.length; i++){
      ele[i].on = function(event, func){ this.addEventListener(event, func); }
   }
   return ele;
};

//Make an app
var app = {
   input: $('.add input')[0],
   add: $('.add button')[0],
   tasks: $('.tasks')[0],
   start: function(){
      app.add.on('click', app.addTask);
      //Add Delete to current tasks
      app.loadTasks();
   },
   loadTasks: function(){
      app.tasks.innerHTML = '';
      data.forEach(function(task, index){
         app.insertTaskHTML(task, index);
         task.last = false;
      });
      app.addDeleteAction();
   },
   insertTaskHTML: function(task, id){
      var taskHTML = `
         <div class="task" id="id_${id}" last=${task.last}>
            <p>${task.title}</p>
            <button>-</button>
         </div>
      `;
      app.tasks.innerHTML = taskHTML + app.tasks.innerHTML;
   },
   addDeleteAction: function(){
      var tasks = $('.tasks .task button');
      for(var i = 0; i < tasks.length; i++){
         tasks[i].on('click', function(){
            app.deleteTask(this);
         });
      } 
   },
   deleteTask: function(btn){
      var id = btn.parentElement.id;
      var index = id.split('_')[1];
      $('#' + id)[0].classList.add('del');
      setTimeout(function(){
         data.splice(index, 1);
         app.loadTasks();
      }, 500, index);
      
   },
   addTask: function(){
      if(app.input.value.length == 0) return
      
      data.push({ title: app.input.value, last: true });
      app.input.value = '';
      app.loadTasks();
   }
}

app.start();