# blockchainDemo
Demonstrating simple blockchain using JavaScript.

 ## Scenario:
<p>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Let's consider there is a Company ABC1 which is having one shared ODC/Room. This room is used by more than 2 companies to deploy their employees to work for ABC1 company.<br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Now each vendor requires to request for a seatCode before deploying their employees to work there. This can be demonstrated as a simple blockchain network by using the current application.
</p>

 ## APIs:
 <p> You can use the below APIs to see the app in action.</p>
 <br/>
 <b>Get  Blockchain </b> get API http://localhost:9009/seatCodeChain
 <br/> 
 <b>Get  Available seatcodes </b> get API http://localhost:9009/availableSeatCodes
 <br/> 
 <b>Get  Available seatcodes </b> post API http://localhost:9009/requestSeatCode
 <br/>
you need to send below requestObj <br/>
{	
	"companyCode": "COMPANY1",
	"empCode": "EMP1"
}
<br/>
 <b>Mining seatcodes </b> get API http://localhost:9009/mining
 <br/>
 This will confirm the seatcodes and also add few more seatcodes to be available for next requests.
