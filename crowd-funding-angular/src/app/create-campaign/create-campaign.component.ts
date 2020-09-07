import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../services/campaign.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {

  user_id:any;

  // define stucture of campaign to be created
  campaign={
    'user_id':0,
    'cam_title':'',
    'cam_subject':'',
    'cam_desc':'',
    'cam_category':'',
    'cam_duration':'',
    'cam_pledge':'',
    'image_preview':'https://ksr-ugc.imgix.net/assets/029/917/974/ceeeaf2762dca8be23fe136527f567da_original.JPG?ixlib=rb-2.1.0&crop=faces&w=352&h=198&fit=crop&v=1595473971&auto=format&frame=1&q=92&s=11cc9d0617a96365b1c5f9c7dc12051a'
  }

  constructor(
    private authService:AuthService,
    private router:Router,
    public campaignService:CampaignService
  ) { }
  
  ngOnInit() {
    if(localStorage.getItem('token')){
      this.authService.getUserId().subscribe((data:any)=>{
        if(data.status=="1"){
          this.user_id=data.user_id;
        }
        else{
          this.router.navigate(['login']);
        }
      });
    }
    // intialize all form inputs to null
    // this.campaign.user_id=0;
    // this.campaign.cam_title='';
    // this.campaign.cam_subject='';
    // this.campaign.cam_desc='';
    // this.campaign.cam_category='';
    // this.campaign.cam_duration='';
    // this.campaign.cam_pledge='';
  }

  createCampaign(campaignForm:NgForm){
    console.log(this.campaign);
    // static user_id
    this.campaign.user_id=this.user_id;
    // call service to crate campaign and redirect user to enter next inputs
    this.campaignService.createCampaign(this.campaign).subscribe((data:any)=>{
      //insertId gives - auto increment primary key 
      console.log("inserted id"+data.insertId);    

      //redirect with this campaign_id
      this.router.navigate(['/create-campaign/add-rewards/'+data.insertId]);  
    });
    // finally reset the form
    campaignForm.reset();
  }

}
