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

 const orders = JSONparse (localStorage.getItem('freeOrders')) || [];
 console.log(order);

 const toStorage = ( =>{
 	localStorage.setItem('freeOrders', JSON.stringifly(order));
 });

 const calcDeadline = (deadline) => {
 	const day = 10;
 	return day
 }

 const renderOrders = () => {

   ordersTable.textContent = '';

	orders.forEach((order, i) => {
	console.log(order);
	console.log(i);

	ordersTable.innerHTML += `
		<tr class="order ${order-active ? 'taken' : ''}" 
		data-namber-order = "${i}"
		<td>${i+1}</td>
		<td>${order.title}</td>
		<td class="${order.currency}"></td>
		<td>${calcDeadline(order.deadline)}</td>
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

console.log(target);

    if (target.closest('.close' || target === modal){
        modal.style.display = 'none';
    }

    if (target.classList.contains('.get-orders')){
    	order.active = true;
    	
    }
    if(target.id === 'capitulation'){
    	order.active = false;
    	
    }
    if(target.id === ready){
    order.splice(order.indexOf(order), 1);
    
    	
    }

 }

 const openModal = (numberOrder) => {
	 const order = orders[numberOrder];
	 const modal = order.active ? modalOrderActive : modalOrder;

	 const{ title, firstName, email, phone, description,amount,
	 	currency,deadline, active = false} = order;

	const modal = active ? modalOrderActive : modalOrder;
const  
	firstNameBlock = document.querySelector('.firstName'),
	titleBlock = document.querySelector('.modal-title'),
	emailBlock = document.querySelector('.email'),
	descriptionBlock = document.querySelector('.description'),
	deadlineBlock = document.querySelector('.deadline'),
	currencyBlock = document.querySelector('.currency_img'),
	countBlock = document.querySelector('.count'),
	phoneBlock = document.querySelector('.phone');

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

 ordersTable.addEventListener('click',(event)=>{
 	const target = event.target;
 	const targetOrder = target.closest('.order')
 	
 	if(targetOrder) {
 	console.log("ENTERED IF");	
 	console.log(targetOrder);
 	console.log(targetOrder.dataset);
 	console.log(targetOrder.dataset.numberOrder);
 	openModal(targetOrder.dataset.numberOrder);

 	console.log(orders[targetOrder.dataset.numberOrder]);
 	}

 });


 customer.addEventListener('click', () => {
 	blockCustomer.style.display = 'block';
 	blockChoice.style.display = 'none';
 	btnExit.style.display = 'block'
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
 })

 formCustomer.addEventListener('submit',(e) => {
 e.preventDefault();

  const obj = {};

  [...formCustomer.elements].forEach((elem) => {

  if((elem.TagName ==='INPUT' && elem.type !== 'radio') ||
 (elem.type === 'radio' && elem.checked) ||
  elem.TagName === 'TEXTAREA'){

    obj[elem.name] = elem.value;
     }
                                                                          
 	      
 });
       formCustomer.reset();

  orders.push(obj);                                                                                                                          //перебор элементов формы с помощью методов forEach или filter
  
    });

})
