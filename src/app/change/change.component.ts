import { Component, OnInit } from '@angular/core';
import{ChangeService} from '../_services/change.service';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'change',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent{
    constructor(private changeservice:ChangeService, private storageService:StorageService){};
    pass='';
    recheckpass='';
    user=this.storageService.getUser();
    check():void{
        if(this.pass!=this.recheckpass)
        {
            alert('Please check both the passwords are same.');
            return;
        }
        else{
            this.change();
        }
    }
    change():void{
        if(!this.user){
            alert("Pls login to continue.");
            return;
        }
        const payload={
            username:this.user.username,
            newPassword:this.pass
        };
        this.changeservice.changePassword(payload).subscribe({
            next: (response) => {alert(`Password change Succesful:`);},
            error: (err) => {console.error(err);    }
        });
    }
}