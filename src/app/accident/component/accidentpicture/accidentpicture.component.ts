import { Accidentpicture, Accident } from './../../../shared/table/table';
import { AccidentpictureService } from './../../../shared/services/accidentpicture.service';
import { Component, OnInit, Input } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-accidentpicture',
  templateUrl: './accidentpicture.component.html',
  styleUrls: ['./accidentpicture.component.css']
})
export class AccidentpictureComponent implements OnInit {

  @Input() accident: Accident;
  @Input() titlelist: string;

  uploadedFiles: any[] = [];

  imageUrl = '';
  filetoUpload: File = null;


  selectedFile: File = null;
  accidentPictures: Accidentpicture[];
  newAccidentPicture: Accidentpicture = {
    id: 0,
    idaccident: this.accident,
    name: '',
    image: null,
    datecreate: new Date(),
    dateupdate: new Date(),
    lastuser: 'ali',
    owner: 'ali'
  };

  constructor(private accidentPictureService: AccidentpictureService) { }

  ngOnInit() {
    this.accidentPictureService.getAll()
        .subscribe(accidentPictures => {
          this.accidentPictures = accidentPictures;
        });
  }

  onSelectedFile(event) {
     this.selectedFile = event.target.files[0];
  }

  myUploader(event) {
    for(const file of event.files) {
     //   this.uploadedFiles.push(file);
        this.onUpload1(file);
       console.log(event);
    }
}


  onUpload1(file) {
    /* const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name); */
    const data = new FormData();
    console.log(file);
    data.append('image', file);

    

    this.newAccidentPicture.name  = file.name;
    this.newAccidentPicture.idaccident = this.accident;
    const myReader: FileReader = new FileReader();

    myReader.readAsDataURL(file);
   /*  myReader.onload = () => {
      this.form.get('avatar').setValue({
        filename: file.name,
        filetype: file.type,
        value: myReader.result.split(',')[1]
      })
    };
 */


   // myReader.readAsText(file);
    myReader.onloadend = (error: any): void => {
          console.log(myReader.result);
          const bfile = new Blob([myReader.result], {
            type: 'image/jpeg'
          });
          // this.newAccidentPicture.image = bfile;
    this.accidentPictureService.create(this.newAccidentPicture)
    .subscribe(event => {
      console.log(event);
    });
  };
  }

 /*  myUploader(): void{
    this.selectedClass(event);
    this.uploadClasses();

  }

  selectedClass(event): void{
    this.classesFile = event.files[0];
  }

  uploadClasses(): void {
    let myReader: FileReader = new FileReader();

      myReader.readAsText(this.classesFile);
      myReader.onloadend = (error: any): void => {
          console.log(myReader.result);
          this.uploadService.postClasses(myReader.result).subscribe(
            (data: any): void => {
              if(data.success) {
                console.log(data);
                this.flashMessage.show('Upload Classes Successfully', {
                    cssClass: 'alert-success',
                    timeout: 3000
                });
                this.router.navigate(['/uploadclass']);
              } else {
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: 'Upload Error', detail: 'Something went wrong'});
                this.router.navigate(['/uploadclass']);
              }
            },
            (error: Error): void =>{
              console.error(error);
            }
          );
      };
  }
 */

 handleFileToUpload(files: FileList) {
   this.filetoUpload = files.item(0);
   const reader = new FileReader();
   reader.onload = (event: any) => {
     this.imageUrl = event.target.result;
   };
   reader.readAsDataURL(this.filetoUpload);
 }
 
 saveImage() {
  // const dt = new Date().f;
  const datePipe = new DatePipe('en-US');
  const strdate = datePipe.transform(new Date(), 'yyMMddHHmmss');
  const formData: FormData = new FormData();
  formData.append('name', this.filetoUpload.name);
  formData.append('id', '0');
  formData.append('idaccident', JSON.stringify(this.accident));
  formData.append('datecreate', strdate);
  formData.append('dateupdate', strdate);
  formData.append('image', this.filetoUpload);

  this.newAccidentPicture.name  = this.filetoUpload.name;
  this.newAccidentPicture.idaccident = this.accident;
  this.newAccidentPicture.image = this.filetoUpload;
  // this.newAccidentPicture.image = bfile;
  this.accidentPictureService.create(this.newAccidentPicture)
  .subscribe(event => {
    console.log(event);
  });
 }



}
