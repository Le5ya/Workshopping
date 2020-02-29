document.addEventListener('DOMContentLoaded', () =>{
	'use strict';

 const customer = document.getElementById('customer');
 const freelancer = document.getElementById('freelancer');
 const blockCustomer = document.getElementById('block-customer');
 const blockFreelance = document.getElementById('block-freelancer');
 const blockChoice = document.getElementById('block-choice');
 const btnExit = document.getElementById('btn-exit');
 const formCustomer = document.getElementById('form-customer');
 const ordersTable = document.getElementById('orders');
 const modalOrder = document.getElementById('order_read');
 const modalOrderActive = document.getElementById('order_active');
 const headTable = document.getElementById('head-table');
 localStorage.clear();

 const orders = JSON.parse(localStorage.getItem('freeOrders')) || [];

 const toStorage = () =>{
 localStorage.setItem('freeOrders', JSON.stringify(orders));
 };

const declOfNum = (number, titles) => number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ?
 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

 const calcDeadline = (date) => {
 const deadline = new Date(date);
 //console.console.dir(deadline.toISOString());
const toDay = Date.now();

const remaining = (deadline - today) / 1000 / 60 / 60;

if (remaining / 24 > 2) {
//console.log(Math.floor(remaining));
return declOfNum(Math.floor(remaining / 24), ['день' ,'дня' , 'дней']);
    }

return declOfNum(Math.floor(remaining), ['час' ,'часа' , 'часов']);
   }

   const renderOrders = () => {

   ordersTable.textContent = '';

	   orders.forEach((order, i) => {
	   orders.innerHTML += `
		<tr class="order ${order.active ? 'taken' : ''}"          
		data-namber-order = "${i}"
		<td>${i+1}</td>
		<td>${order.title}</td>
		<td class="${order.currency}"></td>
		<td>${order.deadline}</td>
	<tr/>`;


    });
 };

      const handlerModal = (event) => {
 	  const target = event.target;
 	  const modal = target.closest('.order-modal');
 	  const order = order[modal.id];

 	  const baseAction = () => {
 	  	modal.style.display = 'none';
 	  	toStorage();
 	  	renderOrders();
 	  }



    if (target.closest('.close') || target === modal) {
        modal.style.display = 'none';
        
    }

    if (target.classList.contains('.get-orders')){
    	order.active = true;
    	baseAction();
    }
    if(target.id === 'capitulation'){
    	order.active = false;
    	baseAction();
    }
    if(target.id === ready){
    order.splice(order.indexOf(order), 1);
    baseAction();
    	
    }

 }

 const openModal = (numberOrder) => {
 const order = orders[numberOrder];

const { title, firstName, email, phone, description,amount,            /* spread syntax*/
	 	currency, deadline, active = false } = order;

const  modal = active ? modalOrderActive : modalOrder;
 
const  firstNameBlock = modal.querySelector('.firstName'),
	   titleBlock = modal.querySelector('.modal-title'),
	   emailBlock = modal.querySelector('.email'),
	   descriptionBlock = modal.querySelector('.description'),
	   deadlineBlock = modal.querySelector('.deadline'),
	   currencyBlock = modal.querySelector('.currency_img'),
	   countBlock = modal.querySelector('.count'),
	   phoneBlock = modal.querySelector('.phone');

       modal.id = numberOrder;
       titleBlock.textContent = title;
	   firstNameBlock.textContent = firstName;

	   emailBlock.textContent = email;
	   emailBlock.href = 'mailto:' + email;
	   descriptionBlock.textContent = description;
	   deadlineBlock.textContent = calcDeadline(deadline);
	   currencyBlock.className = 'currency_img';
	   currencyBlock.classList.add(currency);
	   countBlock.textContent = amount;

phoneBlock && (phoneBlock.href = 'tel:' + phone);

 	modal.style.display = 'flex';

 	modal.addEventListener('click', handlerModal);
 }; 

 const sortOrder =(arr, property) => {
 	arr.sort((a, b) => a[property] > b[property] ? 1 : -1)
 }

 headTable.addEventListener('click', (event) =>{
        const target = event.target;

        if (target.classList.contains('head-sort')) {
        	if (target.id === 'taskSort'){
                    sortOrder(orders, 'title')
        	}
        		if (target.id === 'currencySort'){
                    sortOrder(orders, 'currency')
        		}
        			if (target.id === 'deadlineSort'){
                    sortOrder(orders, 'deadline')
        			}
        			toStorage();
        			renderOrders();

        	

        }
 });
console.log('test');
   ordersTable.addEventListener('click',(event)=>{
 	const target = event.target;
 	console.log(target);

 	const targetOrder = target.closest('.order')
 	if(targetOrder) {
    openModal(targetOrder.dataset.numberOrder);
    console.log("ENTERED IF");	
 	///console.log(targetOrder);
 	//console.log(targetOrder.dataset);
 	//console.log(targetOrder.dataset.numberOrder);
 	

     console.log(targetOrder.dataset.numberOrder);
 	}

 });


 customer.addEventListener('click', () => {
 	blockChoice.style.display = 'none';
 	const toDay = new Date().toISOString().substring(0, 10);
 	document.getElementById('deadline').min = toDay;
 	blockCustomer.style.display = 'block';
 	btnExit.style.display = 'block';
 });

 freelancer.addEventListener('click', () =>{
 	blockChoice.style.display = 'none';
 	renderOrders();
 	
 	blockFreelance.style.display ='block';
 	btnExit.style.display = 'block'

 });

 btnExit.addEventListener('click', () =>{
 	btnExit.style.display = 'none';
 	blockFreelance.style.display = 'none'
 	blockCustomer.style.display = 'none';
 	blockChoice.style.display = 'block';
 });

 formCustomer.addEventListener('submit',(e) => {                /*callback function*/
 e.preventDefault();

  const obj = {};

  [...formCustomer.elements].forEach((elem) => {

  if((elem.TagName ==='INPUT' && elem.type !== 'radio') ||
  (elem.type === 'radio' && elem.checked) ||
   elem.TagName === 'TEXTAREA'){

    obj[elem.name] = elem.value;

if (elem.type !== 'radio') {
	elem.value = '';
}
  }
                                                                          
 	    
 });

 formCustomer.reset();

  orders.push(obj);                                                                                                                          //перебор элементов формы с помощью методов forEach или filter
  
    });
 

})
