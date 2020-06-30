import React from 'react'
import Layout from '../components/Layout';

export default class Welcome extends React.Component {

  // all files user is submitting to us
  allFiles = [];
  submitDisabled = true;

  // submit the files
  submit() {
    console.log('clicked')
    const req = {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: this.allFiles
    }
    fetch(`http://submissionsystem.herokuapp.com/submit`, req).then(data => console.log(data))
    return;
  }

  removeEntry(name) {
    var entry = document.getElementById(name);
    console.log(entry)
    document.getElementById('submittedFiles').removeChild(entry);
    for (var i=0; i<this.allFiles.length; i++) {
      if (this.allFiles[i].name == name) {
        this.allFiles[i] = '';
      }
    }
    // reorganise list
    var newlist = []
    for (var i=0; i<this.allFiles.length; i++) {
      if (this.allFiles[i]) {
        newlist.push(this.allFiles[i])
      }
    }
    this.allFiles = newlist;
    // disable submit button if list of files empty
    if (this.allFiles.length == 0) {
      document.getElementById('submitButton').id = 'submitButtonDisabled';
      this.submitDisabled = true;
    }
  }

  readFile() {
    // get the custom button to function like the input button
    var submit = document.getElementById("realFile");

    // when the user submits a file
    submit.addEventListener("change", () => {
      // all files uploaded so far
      if (submit.files) {
        //document.getElementById('submitButton').
        var list = [...submit.files]
        // for all the files submitted
        list.forEach((file) => {
          // if our total count on our side is not empty
          if (this.allFiles.length != 0) {
            // check if this file has already been uploaded before, if so, disallow to be added
            for (var i=0; i<this.allFiles.length; i++) {
              if (this.allFiles[i].name == file.name) {
                return;
              }
            }
            // if the last change was not the same file
            if (!this.allFiles.includes(file, this.allFiles.length-1)) {
              // then add it to our list (this is a bug from event change method, called multiple times)
              this.allFiles.push(file)
            }
          }
          // if our total count is 1
          else {
            this.allFiles.push(list[0])
          }
        })
      }

      document.getElementById('submittedFiles').innerHTML = '';

      // show to the users what they have submitted
        this.allFiles.forEach(element => {
          if (!element) return;
          var entryText = document.createElement('h3');
          entryText.id = 'fileEntryText';
          entryText.innerHTML = element.name;
          var entry = document.createElement('div');
          entry.className = 'fileEntry';
          entry.id = element.name
          entry.appendChild(entryText);
          var removeButton = document.createElement('button');
          removeButton.id = 'entryRemoveButton';
          removeButton.innerHTML = 'Remove';
          removeButton.addEventListener('click', () => this.removeEntry(entry.id))
          entry.appendChild(removeButton);
          document.getElementById('submittedFiles').appendChild(entry);
        });
        console.log(this.allFiles)
        return;
    });
    console.log(this.submitDisabled)
        // enable submit button
        if (document.getElementById('submitButtonDisabled')) {
          document.getElementById('submitButtonDisabled').id = 'submitButton'; 
        }
        this.submitDisabled = false;
        console.log(this.submitDisabled)
  }

  render () {
    return (
        <Layout>
          <h1 className="welcome"> JAVA101 Submission Page </h1>
          <div style={{marginTop: 100, height: 100, backgroundColor: `black`}}>
            <input type="file" id="realFile" hidden="hidden" multiple onInput={() => {return this.readFile()}}/>
            <button type="button" id="uploadButton" onClick={() => {document.getElementById('realFile').click()}}>Choose File(s)</button>
            <div id="submittedFiles" style={{padding: 20, margin: 20, backgroundColor: `#E0EFF0`}}>
              {/* submitted files go here */}
              <h2 id="placeholder" style={{color: `black`}}>No Files Uploaded Yet</h2>
            </div>
            <button type="submit" id="submitButtonDisabled" onClick={() => {if (!this.submitDisabled) this.submit()}}> Submit </button>
          </div>
        </Layout>
    );
  }
}
