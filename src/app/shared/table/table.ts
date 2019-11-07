// import { Accidentagentsh } from 'shared/table/table';

import { TreeNode } from 'primeng/api';

export interface InputData<T> {
    data: T;
    cancelDialog: boolean;
}

export let UserInfo: any = {
  name: '',
  group: '',
  role: '',
  token: ''
};

export type TFunctionName = <T, K>(item: T, arg: K) => any;
export enum Mode {insert = 0, update = 1, delete = 2}
export interface EventArgs {
    item: any;
    mode: Mode;
    dialogVisible?: boolean;
    table?: any;
}

export interface Users {
  id?: number;
  idagent?: string;
  name?: string;
  username?: string;
  password?: string;
  owner?: string;
  lastuser?: string;
  datecreate?: Date;
  dateupdate?: Date;
}

export interface Activity {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Mark {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Label {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface TypeObject {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface TypeFormation {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Formation {
    id?: number;
    name?: string;
    idtypeformation?: TypeFormation;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface TypeOperation {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface UnitMeasure {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}


export interface Site {
    id?: number;
    name?: string;
    idlabel?: Label;
    idparent?: Site;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface InfoSite {
    node: TreeNode;
    name?: string;
    label: Label;
 }


export interface Titletask {
    id?: number;
    name?: string;
    kind?: string;
    idparent?: number;
    kindparent?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Object {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Property {
    propertyPK?: any;
    type?: string;
    name?: string;
    idunitmeasure?: any;
    object1?: any;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Instance {
    id?: number;
    idobject?: any;
    idsite?: any;
    idmark?: any;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Operation {
    id?: number;
    name?: string;
    idTypeOperation?: any;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Jobposting {
    id?: number;
    idAgent?: any;
    idSite?: any;
    datefirst?: Date;
    datelast?: Date;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Listagent {
    id?: number;
    agent?: any;
    jobposting?: any;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Caseagent {
    id?: number;
    idAgent?: any;
    case?: string;
    idJobposting?: any;
    datefirst?: Date;
    datelast?: Date;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Nature {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Element {
    id?: number;
    name?: string;
    idnature?: any;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Rank {
    id?: number;
    name?: string;
    investigation?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Grid {
    id?: number;
    name?: string;
    idelement?: any;
    idrank?: any;
    degree?: number;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface CellGrid {
    iddamage: number;
    idgrid: number;
    name: string;
    accidentdomain: number;
    idnature: number;
    rate: number;
    oldrate: number;
  }

export interface VwGridForAccident {
    idw?: string;
    id?: number;
    idaccident?: number;
    col1?: CellGrid;
    col2?: CellGrid;
    col3?: CellGrid;
    col4?: CellGrid;
    col5?: CellGrid;
    col6?: CellGrid;
    col7?: CellGrid;
    expanded?: boolean;
}

export interface Accident {
    id?: number;
    classification?: string;
    sitedescription?: string;
    event?: string;
    place?: string;
    persondamage?: string;
    propertydamage?: string;
    envirenementdamage?: string;
    pevent?: string;
    ppersondamage?: string;
    ppropertydamage?: string;
    penvirenementdamage?: string;
    obviouscause?: string;
    victim?: string;
    subject?: string;
    idsite?: any;
    curdate?: Date;
    time?: Date;
    tabindex?: number;
    idagentdeclare?: Agent;
    idagentvalidate?: Agent;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Accidentpicture {
    id?: number;
    idaccident?: Accident;
    name?: string;
    image?: File;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface IAgent {
    agent: Agent;
    name: string;
}

export interface AccidentnaturePK {
    idaccident?: any;
    idnature?: number;
}

export interface Accidentnature {
    accident: Accident;
    accidentnaturePK: AccidentnaturePK;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Damage {
    id?: number;
    accidentdomain?: number;
    accidentnature?: Accidentnature;
    idgrid?: number;
    degree?: string;
    description?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Cause {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Aggravatingfactor {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Recommendation {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Bit {
    id?: string;
    idbitclass?: string;
    name?: string;
    kind?: string;
    idparent?: string;
    kindparent?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Agent {
    id?: string;
    firstname?: string;
    lastname?: string;
    dateofbirth?: Date;
    familysituation?: string;
    adress?: string;
    placeofbirth?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Detailagent {
    agent?: Agent;
    daterecruitment?: Date;
    category?: string;
    idstructure?: string;
    idfunction?: string;
    namefunction?: string;
    worksystem?: string;
    pointingsystem?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Vwagent {
    id?: string;
    firstname?: string;
    lastname?: string;
    dateofbirth?: Date;
    familysituation?: string;
    adress?: string;
    placeofbirth?: string;
    daterecruitment?: Date;
    category?: string;
    idstructure?: string;
    idfunction?: string;
    namefunction?: string;
    worksystem?: string;
    pointingsystem?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Vwagentfinder {
    id?: string;
    firstname?: string;
    lastname?: string;
    dateofbirth?: Date;
    familysituation?: string;
    adress?: string;
    placeofbirth?: string;
    daterecruitment?: Date;
    category?: string;
    idstructure?: string;
    idfunction?: string;
    namefunction?: string;
    worksystem?: string;
    pointingsystem?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface AccidentagentshPK {
    idagent: string;
    iddamage: number;
}

export interface AccidentagenteePK {
    iddamage: number;
    id: number;
}

export interface AccidentagenttpPK {
    iddamage: number;
    id: number;
}

export interface Accidentagentsh {
    accidentagentshPK?: AccidentagentshPK;
    accidentdomain?: number;
    agent?: Agent;
    countstopwork?: number;
    datecreate?: Date;
    dateupdate?: Date;
    idgrid?: number;
    owner?: string;
    lastuser?: string;
    samury?: string;
    typeaccident?: string;
}

export interface Accidentagentee {
    accidentagenteePK: AccidentagenteePK;
    name?: string;
    function?: string;
    identreprise?: any;
    countstopwork: number;
    accidentdomain: number;
    typeaccident: string;
    idgrid: number;
    samury?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
    dateofbirth?: Date;
}

export interface Accidentagenttp {
    accidentagenttpPK: AccidentagenttpPK;
    name?: string;
    function?: string;
    countstopwork?: number;
    accidentdomain?: number;
    typeaccident?: string;
    idgrid?: number;
    samury?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
    dateofbirth?: Date;
}

export interface Accidentvehicule {
    id?: number;
    iddamage?: number;
    idgrid: number;
    accidentdomain?: number;
    idmark?: any;
    name?: string;
    source?: string;
    destination?: string;
    classification?: string;
    kind?: string;
    matricule?: string;
    accidentvehiculedriver?: Accidentvehiculedriver;
    accidentvehiculeinsurance?: Accidentvehiculeinsurance;
    accidentvehiculeowner?: Accidentvehiculeowner;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Accidentvehiculeinsurance {
    idaccidentvehicule?: number;
    policynumber?: string;
    identreprise?: Entreprise;
    owner?: string;
    lastuser?: string;
    datefirst?: Date;
    datelast?: Date;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Accidentvehiculedriver {
    idaccidentvehicule?: number;
    name?: string;
    adress?: string;
    membership?: string;
    licensenumber?: string;
    owner?: string;
    lastuser?: string;
    dateofbirth?: Date;
    placeofbirth?: string;
    issuedon?: Date;
    issuedby?: string;
    accidentvehiculedriversh?: Accidentvehiculedriversh;
    accidentvehiculedriverns?: Accidentvehiculedriverns;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Accidentvehiculedriversh {
    idaccidentvehicule?: number;
    idagent?: Agent;
    membership?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Accidentvehiculedriverns {
    idaccidentvehicule?: number;
    name?: string;
    adress?: string;
    membership?: string;
    owner?: string;
    lastuser?: string;
    dateofbirth?: Date;
    placeofbirth?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Accidentvehiculeowner {
    idaccidentvehicule?: number;
    name?: string;
    adress?: string;
    phone?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Accidentcause {
    id?: number;
    idaccident?: number;
    idgrid?: number;
    idnature?: number;
    accidentdomain: number;
    description?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Accidentagentshbit {
    id?: number;
    accidentagentsh?: Accidentagentsh;
    idgrid?: number;
    idbit?: string;
    idbitclass?: string;
    name?: string;
    kind?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Typeaccident {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Bitclass {
    id?: string;
    kind: string;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Vw$accidentagentshbit {
    idaccidentbit?: number;
    iddamage: number;
    idagent: string;
    idgrid?: number;
    idbitclass?: string;
    classname?: string;
    idbit?: string;
    kind?: string;
    name?: string;
    bitname?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Action {
    id?: number;
    name?: string;
    kind?: string;
    state?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Sendaction {
    id?: number;
    curdate?: Date;
    idstructure?: number;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Actionsended {
    idsendaction?: number;
    curdate?: Date;
    idaction?: number;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Vwactionsended {
    id?: number;
    idsendaction?: number;
    curdate?: Date;
    idaction?: number;
    nameaction?: string;
    kind?: string;
    stateaction?: string;
    state?: string;
    idstructure?: number;
    namestructure?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
    aaowner?: string;
    aalastuser?: string;
    aadatecreate?: Date;
    aadateupdate?: Date;
    aowner?: string;
    alastuser?: string;
    adatecreate?: Date;
    adateupdate?: Date;
    stowner?: string;
    stlastuser?: string;
    stdatecreate?: Date;
    stdateupdate?: Date;
}


export interface Actionaccident {
    idaccident?: Accident;
    idaction?: number;
    kind?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface VwactionAccident {
    id?: string;
    idaccident?: number;
    idaction?: number;
    kind?: string;
    state?: string;
    name: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface ActionassignmentPK {
    idsendaction?: number;
    idaction?: number;
}

export interface Actionassignment {
    sendaction?: Sendaction;
    action?: Action;
    actionassignmentPK: ActionassignmentPK;
    state?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Structure {
    id?: number;
    name?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Entreprise {
    id?: number;
    name?: string;
    adress: string;
    phone: string;
    fiscalenumber: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Accidentmaterial {
    id?: number;
    name?: string;
    damagename?: string;
    accidentdomain?: number;
    iddamage?: number;
    idgrid?: number;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface DamageDefinition {
    id?: number;
    name?: string;
    accidentdomain?: number;
    iddamage?: number;
    idgrid?: number;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Accidentfile {
    id?: number;
    idaccident?: any;
    name: string;
    path?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

// ******     partie inspection  ***********

export interface InspectedSite {
    idsite?: Site;
    periodicity: number;
    enable?: number;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface VwinspectedSite  {
    id?: Site;
    name?: string;
    periodicity: number;
    enable?: number;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}


export interface InspectPlanning {
    id?: number;
    idsiteinspected?: InspectedSite;
    datefirst?: Date;
    datelast?: Date;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Opscard {
    id?: number;
    observer?: string;
    curdate?: Date;
    site?: string;
    measure?: string;
    action?: string;
    description?: string;
    nameentreprise?: string;
    kind?: string;
    degree?: string;
    state?: string;
    jobsite?: string;
    detailopscard: Detailopscard;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}


// *****************************************

export interface Work {
    datecreate?: Date;
    dateupdate?: Date;
    id?: number;
    name?: string;
    owner?: string;
}

export interface Detailopscard {
    datecreate?: Date;
    dateupdate?: Date;
    idopscard?: number;
    idsite?: Site;
    idwork?: Work;
    kind?: string;
    owner?: string;
    starttype?: string;
    zone?: string;
}

export interface DetailopscardstructurePK {
    idopscard?: number;
    idstructure?: number;
}

export interface Detailopscardstructure {
    datecreate?: Date;
    dateupdate?: Date;
    detailopscard?: Detailopscard;
    detailopscardstructurePK?: DetailopscardstructurePK;
    lastuser?: string;
    owner?: string;
    structure?: Structure;
}

export interface ActionopscardPK {
  idopscard?: number;
  idaction?: number;
}


export interface Actionopscard {
    idaction?: number;
    idopscard?: number;
    kind?: string;
    owner?: string;
    lastuser?: string;
    datecreate?: Date;
    dateupdate?: Date;
}

export interface Vwactionopscard {
  id?: string;
  idopscard?: number;
  idaction?: number;
  kind?: string;
  state?: string;
  name?: string;
  owner?: string;
  lastuser?: string;
  datecreate?: Date;
  dateupdate?: Date;
}


export interface Vwreststructureofopscard {
  id?: string;
  idopscard?: number;
  idstructure?: number;
  name?: string;
  owner?: string;
  lastuser?: string;
  datecreate?: Date;
  dateupdate?: Date;
}

export interface Vehiculedisputting {
  id?: number;
  idaccident?: number;
  iddamagea?: number;
  idvehiculea?: number;
  iddamageb?: number;
  idvehiculeb?: number;
  owner?: string;
  lastuser?: string;
  datecreate?: Date;
  dateupdate?: Date;
}

export interface Vwvehiculedisputting {
  id?: number;
  idab?: string;
  idaccident?: number;
  iddamagea?: number;
  idvehiculea?: number;
  marka?: string;
  namea?: string;
  matriculea?: string;
  iddamageb?: number;
  idvehiculeb?: number;
  markb?: string;
  nameb?: string;
  matriculeb?: string;
}


export interface Vwschemavehiculedisputting {
  id?: string;
  idaccident?: number;
  iddamagea?: number;
  idvehiculea?: number;
  marka?: string;
  namea?: string;
  matriculea?: string;
  iddamageb?: number;
  idvehiculeb?: number;
  markb?: string;
  nameb?: string;
  matriculeb?: string;
  owner?: string;
  lastuser?: string;
  datecreate?: Date;
  dateupdate?: Date;
}
