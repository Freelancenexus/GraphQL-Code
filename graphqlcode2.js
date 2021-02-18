<script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="3d8466a7-16e7-483b-ad45-bdf904b05e2f";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>

<script>
   MemberStack.onReady.then(function(member) {    
      var email = member["email"]
      var name = member["first-name"]
       if (member.loggedIn) {
        try {
           $crisp.push(["set", "user:email", [email] ])
           $crisp.push(["set", "user:nickname", [name] ])
        } catch(e) {}
   }})
</script>

<style>
	.ms-test-mode{
  	display: none !important;
  }
</style>
<script>
  document.getElementById("dashboard-crisp-chat").addEventListener("click", function(){
     $crisp.push(['do', 'chat:open']);
   })
</script>

<script>
  document.getElementById("close-feedback-modal").addEventListener("click", function(){
    document.getElementById('CognitoFeedbackForm').src = document.getElementById('CognitoFeedbackForm').src
   })
</script>

<script>
  document.getElementById("close-revision-modal").addEventListener("click", function(){
    document.getElementById('CognitoRevisionForm').src = document.getElementById('CognitoRevisionForm').src
   })
</script>
