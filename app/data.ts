import { matchSorter } from "match-sorter";
// @ts-expect-error - no types
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  github?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("first", "last"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

[
  {
    avatar: "https://avatars.githubusercontent.com/u/3426975?v=4",
    first: "Wesley",
    last: "Costa",
    github: "wesleycosta",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/6237931?v=4",
    first: "Rafael",
    last: "Fonseca",
    github: "rafaelmfonseca",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/7034328?v=4",
    first: "Math",
    last: "Erik",
    github: "matherique",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/7682138?v=4",
    first: "Heder",
    last: "Dorneles",
    github: "hederdorneles",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/16101647?v=4",
    first: "F",
    last: "Santos",
    github: "FSantosx",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/16209118?v=4",
    first: "Maik",
    last: "Vinicius",
    github: "maikvinicius",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/19562376?v=4",
    first: "Renan",
    last: "Mendes",
    github: "renansantosmendes",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/20098968?v=4",
    first: "Victor",
    last: "Rodrigues",
    github: "Victor19Rodrigues",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/22457533?v=4",
    first: "Adoniro",
    last: "Salles",
    github: "AdoniroSalles",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/23157809?v=4",
    first: "Pedro",
    last: "Reis",
    github: "PedroMirandaReis",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/23257561?v=4",
    first: "Paulo",
    last: "Silva",
    github: "pauloalmeidasilva",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/24593826?v=4",
    first: "Val",
    last: "Arr",
    github: "Valarr",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/25940897?v=4",
    first: "Will",
    last: "Amaral",
    github: "will-amaral",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/26943148?v=4",
    first: "Felipe",
    last: "Lima",
    github: "FelipeNLima",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/31164609?v=4",
    first: "Ric",
    last: "Gloria",
    github: "Ricgloria",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/31597729?v=4",
    first: "G",
    last: "Santos",
    github: "gsantosdev",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/31912784?v=4",
    first: "Gui",
    last: "25",
    github: "gui25",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/31970919?v=4",
    first: "Lucas",
    last: "Npc",
    github: "lucasnpc",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/32000880?v=4",
    first: "Lilian",
    last: "Tobace",
    github: "LilianTobace",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/32530166?v=4",
    first: "Fernando",
    last: "NSC",
    github: "FernandoNSC5",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/37334813?v=4",
    first: "Three",
    last: "DP",
    github: "ThreeDP",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/39509860?v=4",
    first: "Cesar",
    last: "Augusto",
    github: "CesarAugusto88",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/42258486?v=4",
    first: "Thi",
    last: "Teago",
    github: "Thiteago",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/42596304?v=4",
    first: "Mathews",
    last: "Mono",
    github: "mathewsmonoo",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/43281774?v=4",
    first: "Victor",
    last: "Marreiros",
    github: "VictorMarreiros",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/44469576?v=4",
    first: "Barbara",
    last: "Bizinoto",
    github: "barbarabizinoto",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/47866003?v=4",
    first: "Tarta",
    last: "Minos",
    github: "Tartaminos",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/47866641?v=4",
    first: "Leo",
    last: "Junior",
    github: "leoljunior",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/48570599?v=4",
    first: "Victor",
    last: "Augusto",
    github: "victoraugusto6",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/49418374?v=4",
    first: "Odenir",
    last: "Dev",
    github: "odenirdev",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/49577657?v=4",
    first: "Gilberto",
    last: "SBS",
    github: "gilbertosbs",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/50971638?v=4",
    first: "Mariana",
    last: "Antunes",
    github: "MarianaAntunesJ",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/51214414?v=4",
    first: "Bece",
    last: "Ro",
    github: "Becero",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/54822067?v=4",
    first: "Andre",
    last: "Glatz",
    github: "andreglatz",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/54875451?v=4",
    first: "Y",
    last: "Catam",
    github: "Ycatam",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/58193880?v=4",
    first: "Edu",
    last: "Gomes",
    github: "edugomess",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/58368539?v=4",
    first: "Vanessa",
    last: "Helena",
    github: "Vanessa-Helena",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/58452863?v=4",
    first: "Henrique",
    last: "Claranhan",
    github: "henriqueclaranhan",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/58984828?v=4",
    first: "Pirees",
    last: "Dev",
    github: "pirees",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/60910920?v=4",
    first: "Natalia",
    last: "Borges",
    github: "NataliaBorges",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/61253283?v=4",
    first: "Rafa",
    last: "El",
    github: "Ra-fael",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/61830297?v=4",
    first: "Gleice",
    last: "Souza",
    github: "gleicebsouza",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/62266636?v=4",
    first: "Marques",
    last: "Sousa",
    github: "marquesmoreirasousa",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/62736528?v=4",
    first: "Rogerio",
    last: "Zero",
    github: "R0GERI0",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/63512780?v=4",
    first: "Yume",
    last: "Dakuzaku",
    github: "YumeDakuzaku",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/65730630?v=4",
    first: "Joao",
    last: "Victor",
    github: "joaovictornsv",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/66341407?v=4",
    first: "Beatriz",
    last: "Qathaide",
    github: "Beatrizqathaide",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/71658206?v=4",
    first: "Juliana",
    last: "Balera",
    github: "BaleraJuliana",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/72608626?v=4",
    first: "Cristiane",
    last: "Pereira",
    github: "Cristiane-Pereira",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/81572416?v=4",
    first: "Lucas",
    last: "Almeida",
    github: "devlucasalmd",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/81631170?v=4",
    first: "Augusto",
    last: "Manzano",
    github: "J-AugustoManzano",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/81653845?v=4",
    first: "Wendi",
    last: "Ramos",
    github: "WendiRamos",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/82128750?v=4",
    first: "Ro",
    last: "Paroli",
    github: "roparoli",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/82920295?v=4",
    first: "Eli",
    last: "Reseda",
    github: "EliReseda",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/83250526?v=4",
    first: "Gustavo",
    last: "Morais",
    github: "Gustavomorais88",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/83482666?v=4",
    first: "Cesar",
    last: "Azevedo",
    github: "cfrazevedo",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/84944254?v=4",
    first: "War",
    last: "Trax",
    github: "wartrax13",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/85112415?v=4",
    first: "Higor",
    last: "18",
    github: "higor18",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/86115352?v=4",
    first: "Laarissa",
    last: "Diniz",
    github: "laaridiniz",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/86871991?v=4",
    first: "Bruno",
    last: "Pires",
    github: "bpires",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/88109066?v=4",
    first: "John",
    last: "Martins",
    github: "johnxMartins",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/92037562?v=4",
    first: "Cadu",
    last: "FC",
    github: "Cadufc91",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/93806852?v=4",
    first: "Elias",
    last: "Neto",
    github: "Elias-Neto",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/94917034?v=4",
    first: "Everton",
    last: "Tech",
    github: "evertontech",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/99450994?v=4",
    first: "Yasmin",
    last: "Vasconcelos",
    github: "yasminvasconceloss",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/99509870?v=4",
    first: "Iago",
    last: "Garbelotti",
    github: "IGarbelotti",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/99884118?v=4",
    first: "Lisa",
    last: "1412",
    github: "lisaap1412",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/106891550?v=4",
    first: "Tati",
    last: "Ramos",
    github: "tatiramoos",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/114448038?v=4",
    first: "Gabriela",
    last: "Vasco",
    github: "Gabriela-Vasco",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/115593123?v=4",
    first: "Juliano",
    last: "Prates",
    github: "JulianoPrates",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/115846058?v=4",
    first: "Andressa",
    last: "L",
    github: "andressa-l",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/122311037?v=4",
    first: "Guto",
    last: "Farias",
    github: "GUTOFAR1AS",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/130506853?v=4",
    first: "Thiago",
    last: "Barbosa",
    github: "thiagosilvabarbosa",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/130695548?v=4",
    first: "Gabriel",
    last: "Formiga",
    github: "GabrielCFormiga",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/134660228?v=4",
    first: "Matheus",
    last: "Tunes",
    github: "matheustunes",
  },
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
  });
});
