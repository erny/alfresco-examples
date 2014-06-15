/* Create folder structure */
/*jslint rhino: true, indent: 4 */
/*globals companyhome, logger, execution */

// var country = execution.getVariable("wf1:country");
// var opportunity = execution.getVariable("wf1:opportunityName");

// Test data
var country = "Spain";
var opportunity = "101-Opportunity 1";



// Some folder data
var base = "Processes Gestamp Solar";


var folder_structure = {
    "Opportunity Data": { 
        "Development": "Permitting",
        "Technical": [
            "Interconnection",
            "Site and Design"
        ],
        "Legal": [
            "Land",
            "Contracts"
        ],
        "Financial": [
            "Financial Information",
            "Base Case"
        ]
    },   
    "Opportunity Contracts": [
        "Service Agreements",
        "Purchase Agreements",
        "Lease Agreements"
    ]
};

logger.log("Creating folders structure for project: " +  opportunity);

function get_or_create(alf_folder, folder) {
  /* alf_folder: alfresco folder where to create subfolders
     folder: "string"
  */
    var alf_new_folder;
    alf_new_folder = alf_folder.childByNamePath(folder);
    if (!alf_new_folder) {
        logger.log("Creating folder '"  + folder + "'");
        alf_new_folder = alf_folder.createFolder(folder);
    } else {
        logger.log("Folder '" + folder + "' exists already.");
    }
    return alf_new_folder;
}

/* Create folder hierarchy */
function create_folders(alf_folder, folders) {
  /* alf_folder: alfresco folder where to create subfolders
     folders_to_create: [name, [subfolder list]]
  */
    var folder, typ;
    if (!alf_folder || !folders) {
        return;
    }
    //
    if (typeof(folders) === "string") {
        return get_or_create(alf_folder, folders);
    }
    if (typeof(folders) === "object") {
        typ = folders.constructor.name;
        for (folder in folders) {
            if (typ === "Array") {
                get_or_create(alf_folder, folders[folder]);
            } else if (typ === "Object") {
                create_folders(get_or_create(alf_folder, folder), folders[folder]);
            } else {
                logger.log("Ignoring type: " + typ);
            }
        }
    }
}


// Create opportunity folder
var basefolder = {};
var countryfolder = {};
var opportunityfolder = opportunity;
countryfolder[country] = opportunityfolder;
basefolder[base] = countryfolder;
var rootfolder = companyhome;
create_folders(rootfolder, basefolder);
var alf_folder = rootfolder.childByNamePath(base).childByNamePath(country).childByNamePath(opportunity);
create_folders(alf_folder, folder_structure);