import React from 'react'
import Layout from '../components/Layout';

export default class Welcome extends React.Component {

  allFiles = [];

  readFile() {
    // get the custom button to function like the input button
    var submit = document.getElementById("realFile");
    submit.click();

    // when the user submits a file
    submit.addEventListener("change", () => {
      if (submit.files) {
        // initialise what they're submitting
        this.allFiles = []
        // remove all old entries if they are already displayed
        if (document.getElementById('submittedFiles').hasChildNodes()){
          document.getElementById('submittedFiles').innerHTML = ""
        }
        this.allFiles = [...submit.files];
      }
      else {
        // no file chosen
        document.getElementById("customText").innerHTML = "No File(s) Chosen Yet";
      }

      // show to the users what they have submitted
      document.getElementById("customText").innerHTML = "";
        this.allFiles.forEach(element => {
          var entry = document.createElement('h2');
          entry.id = 'fileEntry';
          entry.innerHTML = element.name;
          document.getElementById('submittedFiles').appendChild(entry);
        });
    });
  }

  render () {
    return (
        <Layout>
          <h1 className="welcome"> JAVA101 Submission Page </h1>
          <div style={{marginTop: 100, height: 100, backgroundColor: `black`}}>
            <input type="file" id="realFile" hidden="hidden" multiple/>
            <button type="button" id="submitButton" onClick={() => {this.readFile()}}>Choose File(s)</button>
            <span id="customText">No File(s) Chosen Yet</span>
            <div id="submittedFiles" style={{padding: 20}}>
              {/* submitted files go here */}
            </div>
          </div>
        </Layout>
    );
  }
}
