<script>
	const table = document.getElementById("table");
 	const row = document.getElementById("row");
  const loading = document.getElementById("loading");
  const next = document.getElementById("next");
  const previous = document.getElementById("previous");
  const _number = document.getElementById("page-number");
  const _range = document.getElementById("page-range");
	
  loading.style.display = "block";
  row.style.display = "none";
  table.style.display = "block";
  previous.style.pointerEvents = "none";
	previous.style.opacity = 0.5;

  let currentRows = 0;
  let total = 0;
  const pageSize = 10;
  let page = 1;

	const loadData = async (query) => {
    const url = 'https://api.monday.com/v2/';
    loading.style.display = "block";
    table.style.display = "none";
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': '{{wf {&quot;path&quot;:&quot;bepmis8dehvkvoqrekn0iq&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}'
      },
      body: JSON.stringify({query})
    })
    .then(r => r.json())
    .then(result => {
      console.log(result)
      const headers = ['text66', 'text_1', 'dup__of_project_status4', 'date9', 'date5', 'document_types', 'text85', 'attachments', 'customer_acceptance'];
      const allDetails = result.data.items_by_column_values.map(item => { return { ...item.column_values.filter(j => headers.includes(j.id)).map (i => { return {...i, value: JSON.parse(i.value)}})} });
      const allIds = result.data.items_by_column_values.map(item => item.id);
      
      console.log(allDetails)
      currentRows = allDetails.length;
      let i;
      for (i = 0; i < allDetails.length; i++) {
        console.log(allDetails[i]);
        const details = allDetails[i];
        const id = allIds[i];
        const cln = row.cloneNode(true);
        cln.style.display = "block";
        
        const columns = cln.children[0].children;
        
        if(details[8].value && details[8].value.index === 3) {
        	columns[8].children[1].style.display = "block";
          columns[8].children[0].style.display = "none";
        } else {
        	columns[8].children[1].style.display = "none";
          columns[8].children[0].style.display = "block";
        	columns[8].children[0].addEventListener("click", () => {
        		console.log('row details ---->>>', details, id);            
            document.getElementById("item-id").innerText = id;
           	document.getElementById("project-id").innerText = details[0].value;
            document.getElementById("project-name").innerText = details[1].value;
            document.getElementById('CognitoRevisionForm').src = document.getElementById('CognitoRevisionForm').src
            
            var revisionFrame = document.getElementById("CognitoRevisionForm")
Cognito.prefill(
	{
	"ItemID" :"{{wf {&quot;path&quot;:&quot;item-id&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}", 
  "ItemName" :"{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}", 
  "Email" :"{{wf {&quot;path&quot;:&quot;guild-email&quot;,&quot;type&quot;:&quot;Email&quot;\} }}",
  "AirtableID" : "{{wf {&quot;path&quot;:&quot;aittable-id&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}", 
  "AccountType":"{{wf {&quot;path&quot;:&quot;account-type&quot;,&quot;type&quot;:&quot;Number&quot;\} }}",
  "MondaycomItemID": document.getElementById("item-id").innerText,
  "ProjectID": "4326",
  "ProjectName": "eeeeeeeeeeeeeeeee"
  }, 
  revisionFrame); 
            
            
            
            
            
            
            
            
            
            
        	});
        }
       
        console.log('columns', columns);
        columns[0].children[0].innerText = `${details[0].value ? details[0].value : ''}`;
        columns[1].children[0].innerText = `${details[1].value ? details[1].value : ''}`;
        columns[2].children[0].innerText = `${details[2].value ? details[2].value.index : ''}`;
        columns[3].children[0].innerText = `${details[3].value ? details[3].value : ''}`;
        columns[4].children[0].innerText = `${details[4].value ? details[4].value.date : ''}`;
        columns[5].children[0].innerText = `${details[5].value ? details[5].value.date : ''}`;
        columns[6].children[0].innerText = `${details[6].value ? details[6].value.text : ''}`;
        columns[7].children[0].innerText = `${details[7].value ? details[7].value : ''}`;
        table.appendChild(cln); 
      }
      
      loading.style.display = "none";
      table.style.display = "block";
          
      _number.innerText = `Page ${page}`;
      _range.innerText = `${(page - 1) * pageSize + currentRows}/${total} Records`;
    })
  }
  
  const removeRows = (elementsCount) => {
  	let i;
  	for(i = 0; i < elementsCount; i++){
    	table.removeChild(table.lastChild);
    }
	}
  
  const getTotal = async () => {
    const url = 'https://api.monday.com/v2/';
    
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': '{{wf {&quot;path&quot;:&quot;bepmis8dehvkvoqrekn0iq&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}'
      },
      body: JSON.stringify({ query: `{ 
        items_by_column_values (
          board_id: 397135187, 
          column_id: "text8", 
          column_value: "{{wf {&quot;path&quot;:&quot;goresumedesk-account&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}") {
              column_values {
                    id
                    value
              }
    			}
      }`})
    })
    .then(r => r.json())
    .then(result => {
      const allDetails = result.data.items_by_column_values;
      total = allDetails.length;
      _range.innerText = `${(page - 1) * pageSize + currentRows}/${total} Records`;
      console.log('total', total)
    })
  }
  
  const setAsAccepted = async (id, column) => {
    const url = 'https://api.monday.com/v2/';
    
    console.log(id, column);
    
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': '{{wf {&quot;path&quot;:&quot;bepmis8dehvkvoqrekn0iq&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}'
      },
      body: JSON.stringify({ query: `mutation {
      	  change_column_value (
          	board_id: 397135187, 
            item_id: ${id}, 
            column_id: "customer_acceptance", 
            value: "{\"index\": 3}") {
          		id
          	}
					}
      `})
    })
    .then(r => r.json())
    .then(result => {
			console.log(result);
      column.children[1].style.display = "block";
      column.children[0].style.display = "none";
    })
  }
  
  window.addEventListener('load', () => {
  	getTotal();
  	loadData(`{ 
    	items_by_column_values (
        board_id: 397135187, 
        column_id: "text8", 
        column_value: "{{wf {&quot;path&quot;:&quot;goresumedesk-account&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}", 
        page: 1, 
        limit: ${pageSize}) {
        		id
            column_values {
                  id
                  value
            }
    	}
    }`)
  });
  
  next.addEventListener("click", () => {
    page = page + 1;
    if (page == Math.floor(total / pageSize) + 1) {
      next.style.pointerEvents = "none";
			next.style.opacity = 0.5;
      previous.style.pointerEvents = "all";
			previous.style.opacity = 1;
    } else {
      next.style.pointerEvents = "all";
			next.style.opacity = 1;
      previous.style.pointerEvents = "all";
			previous.style.opacity = 1;
    }
 		loadData(`{ 
     	items_by_column_values (
        board_id: 397135187, 
        column_id: "text8", 
        column_value: "{{wf {&quot;path&quot;:&quot;goresumedesk-account&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}", 
        page: ${page}, 
        limit: ${pageSize}) {
        		id
            column_values {
                  id
                  value
            }
    	}
    }`)
    removeRows(currentRows);
  });
  
  previous.addEventListener("click", () => {
  	page = page - 1;
    
    if (page == 1) {
      previous.style.pointerEvents = "none";
			previous.style.opacity = 0.5;
      next.style.pointerEvents = "all";
			next.style.opacity = 1;
    } else {
      next.style.pointerEvents = "all";
			next.style.opacity = 1;
      previous.style.pointerEvents = "all";
			previous.style.opacity = 1;
    }
    
 		loadData(`{ 
      items_by_column_values (
       board_id: 397135187, 
        column_id: "text8", 
        column_value: "{{wf {&quot;path&quot;:&quot;goresumedesk-account&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}", 
        page: ${page}, 
        limit: ${pageSize}) {
        		id
            column_values {
                  id
                  value
            }
    	}
    }`)
    removeRows(currentRows);
  });

	document.getElementById("test").addEventListener("click", function(){
 		console.log('clicked');
  });
  
  

</script>

