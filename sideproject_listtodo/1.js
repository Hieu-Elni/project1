
var STORAGE_KEY = 'todos-vuejs-2.0'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
new Vue({
	el: '#list-todo',
	data: {
		mess:'',
		isCheck:false,
		editing:false,
		beforeEditText:'',
		checkAll:false,
		filter:'all',
		todos:todoStorage.fetch(),
		// classDisplay:{'editing':true}
		 directives: {
			focus: {
			  // định nghĩa cho directive
			  inserted: function (el) {
				el.focus()
			  }
			}
		  }
	},
	methods:{
		addMess:function(){
			if(this.mess.trim().length==0){
				return;
			}
			 this.todos.push({mess:this.mess,isCheck:false,editing:false});
			this.mess='';
		 },
		 remove:function(index){
		 this.todos.splice(index,1);
//    	return this.todo;	
		 },
		 sum:function(){		 
			 return this.todos.length;
		},
		editTodo :function(item){
			 this.beforeEditText=item.mess;
		 item.editing=true;
			// alert('double click');
		 },
		doneEdit:function(item){
			 if(item.mess.trim()=='')
			 item.mess=this.beforeEditText;
			item.editing=false;
		 },
		 cancelEdit:function(item){
		//	item.mess=this.beforeEditText;
		 },
		 allSelect:function(){
		//	 console.log(this.checkAll);
		//	 console.log(this.todos[0].isCheck);

		if(this.checkAll==true){
				 for(var i=0;i<this.todos.length;i++){
					this.todos[i].isCheck=true;
			//		console.log(this.todos[0].isCheck);
				 }
			}else{
				for(var i=0;i<this.todos.length;i++)
				this.todos[i].isCheck=false;		
			 }
		 },
		 allShow:function(){
			for(var i=0;i<this.todos.length;i++){
				if(this.todos[i].isCheck==true||this.todos[i].isCheck==false){
					return this.todo[i];
				}
			}
		 },
		 removeAll:function(){

			this.todos=this.todos.filter(todo=>!todo.isCheck);
		 },
		activeTodo:function(){
		//	 console.log('mnag activ');
		//	for(int )
		//	 this.todos= this.todos.filter(todo =>todo.isCheck==false);
			return this.todos.filter(todo=>todo.isCheck==false);
		 },
		 complete:function(){

			this.todos= this.todos.filter(todo =>todo.isCheck);
		 },
		 doSomething :function(){
			if(this.filter =='all'){
				return this.todos;	
			}else if(this.filter=='active'){
				return this.todos.filter(todo =>!todo.isCheck);
			}else if(this.filter=='complete'){
				return this.todos.filter(todo=>todo.isCheck)
			}
			return this.todos;
		 },
		 countTodo(){
			return this.todos.length;
			}
	 },
	 watch: {
		todos: {
		  handler: function (todos) {
			todoStorage.save(todos);
		  },
		  deep: true
		},
		
	  },
	computed:{

	}
})