import { authClient } from "@/lib/auth-client"
import prisma from "@/lib/Prisma";
import { UserRole } from "@/generated/prisma";

interface HostData {
    name: string;
    email: string;
    password: string;
    phone: string;
    image: string;
    hostProfile: {
        contactNumber: string;
        alternateContact: string;
        whatsappNumber: string;
        address: string;
        languagesSpokenByHost: string[];
    };
}

const hostData: HostData[] = [
  {
    "name": "Rasool",
    "email": "temp_7996445647@gmail.com",
    "password": "temp@7996445647",
    "phone": "7996445647",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7996445647",
      "alternateContact": "7019854834",
      "whatsappNumber": "7996445647",
      "address": "Marathahalli - Tulsi Theater Rd,#389, 2, 7th Cross, Marathahalli Village, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "English",
        "Kannada"
      ]
    }
  },
  {
    "name": "Host",
    "email": "temp_7795489819@gmail.com",
    "password": "temp@7795489819",
    "phone": "7795489819",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7795489819",
      "alternateContact": "7019854834",
      "whatsappNumber": "7795489819",
      "address": "Marathahalli - Opposite Kalamandir, Marathahalli Bridge, 78/79,5th cross,Ramanjaneya Layout Ashirwad hotel road, opposite kalamandir, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "Kannada"
      ]
    }
  },
  {
    "name": "Ram Mohan Reddy",
    "email": "temp_8660860280@gmail.com",
    "password": "temp@8660860280",
    "phone": "8660860280",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8660860280",
      "alternateContact": "7019854834",
      "whatsappNumber": "8660860280",
      "address": "Marathahalli - Behind Kalamandir, 45, 3rd Main St, Hemanth Nagar, Anand Nagar, Aswath Nagar, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "Kannada"
      ]
    }
  },
  {
    "name": "Host",
    "email": "temp_7660040418@gmail.com",
    "password": "temp@7660040418",
    "phone": "7660040418",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7660040418",
      "alternateContact": "7019854834",
      "whatsappNumber": "7660040418",
      "address": "Marathahalli - Karthik Nagar, 93/2, Abdul Kalam layout, Karthik Nagar, Aswath Nagar, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Ramaiah",
    "email": "temp_9964111139@gmail.com",
    "password": "temp@9964111139",
    "phone": "9964111139",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9964111139",
      "alternateContact": "7019854834",
      "whatsappNumber": "9964111139",
      "address": "Marathahalli - Vurthur Main Road, NSR Twins, #35/1B, varthur main road, near spice garden and HP petrol pump Munnekolala, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada",
        "Tamil"
      ]
    }
  },
  {
    "name": "Suman",
    "email": "temp_9066740874@gmail.com",
    "password": "temp@9066740874",
    "phone": "9066740874",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9066740874",
      "alternateContact": "7019854834",
      "whatsappNumber": "9066740874",
      "address": "Marathahalli - Tulsi Theater Rd,46/3,6th main, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Kannada"
      ]
    }
  },
  {
    "name": "Sreenivas",
    "email": "temp_9620344745@gmail.com",
    "password": "temp@9620344745",
    "phone": "9620344745",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9620344745",
      "alternateContact": "7019854834",
      "whatsappNumber": "9620344745",
      "address": "Marathahalli - Behind Kalamandir,No 9, Ist Main, behind Kalamandir, Hemanth Nagar, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Kannada"
      ]
    }
  },
  {
    "name": "Narayana Reddy",
    "email": "temp_7975626364@gmail.com",
    "password": "temp@7975626364",
    "phone": "7975626364",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7975626364",
      "alternateContact": "7019854834",
      "whatsappNumber": "7975626364",
      "address": "Marathahalli - Kundanahalli, Force Avenue Layout, 88, 1st Main Rd, near Brigade Tech Gardens, Kundalahalli, Brookefield, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Rafi",
    "email": "temp_7731999009@gmail.com",
    "password": "temp@7731999009",
    "phone": "7731999009",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7731999009",
      "alternateContact": "7019854834",
      "whatsappNumber": "7731999009",
      "address": "Marathahalli - Spice garden, C-13,Spice garden, Munnekollal Main Rd, Silver Spring Layout, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Padmaja",
    "email": "temp_8296964431@gmail.com",
    "password": "temp@8296964431",
    "phone": "8296964431",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8296964431",
      "alternateContact": "7019854834",
      "whatsappNumber": "8296964431",
      "address": "Site no 6 and 7,8th cross, Chinnapanahalli Main Rd, Ward Number 85, Doddanekundi, extention, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Ramana",
    "email": "temp_9606565567@gmail.com",
    "password": "temp@9606565567",
    "phone": "9606565567",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9606565567",
      "alternateContact": "7019854834",
      "whatsappNumber": "9606565567",
      "address": "Marathahalli - AECS Layout, 640, 1st Main Rd, AECS Layout - C Block, AECS Layout, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi"
      ]
    }
  },
  {
    "name": "Amaravathi",
    "email": "temp_9738682217@gmail.com",
    "password": "temp@9738682217",
    "phone": "9738682217",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9738682217",
      "alternateContact": "7019854834",
      "whatsappNumber": "9738682217",
      "address": "Marathahalli - AECS Layout, 1365, 60 Feet Rd, AECS Layout - D Block, AECS Layout, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Vasantha",
    "email": "temp_9591770257@gmail.com",
    "password": "temp@9591770257",
    "phone": "9591770257",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9591770257",
      "alternateContact": "7019854834",
      "whatsappNumber": "9591770257",
      "address": "Brookfield - Marathahalli, 4th Main, 4th Cross, BEML Layout, ITPL Main Rd, AECS Layout, Brookefield, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English"
      ]
    }
  },
  {
    "name": "Anthara",
    "email": "temp_7090707009@gmail.com",
    "password": "temp@7090707009",
    "phone": "7090707009",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7090707009",
      "alternateContact": "7019854834",
      "whatsappNumber": "7090707009",
      "address": "1st Cross Rd, opposite Kalamandir, Aswath Nagar, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Anthara",
    "email": "temp_7090707009@gmail.com",
    "password": "temp@7090707009",
    "phone": "7090707009",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7090707009",
      "alternateContact": "7019854834",
      "whatsappNumber": "7090707009",
      "address": "No. 90/3, 4th Floor, SOUL SPACE PARADIGM, Marathahalli - Sarjapur Outer Ring Rd, Marathahalli Village, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Anthara",
    "email": "temp_7090707009@gmail.com",
    "password": "temp@7090707009",
    "phone": "7090707009",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7090707009",
      "alternateContact": "7019854834",
      "whatsappNumber": "7090707009",
      "address": "B38, Spice Garden Rd, Lakshminarayana Pura, Silver Springs Layout, Munnekollal, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Janaki",
    "email": "temp_6309405735@gmail.com",
    "password": "temp@6309405735",
    "phone": "6309405735",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "6309405735",
      "alternateContact": "7019854834",
      "whatsappNumber": "6309405735",
      "address": "Marathahalli - Tulsi Theater Rd, 2ND CROSS, Tulsi Theater Rd, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Vasavi",
    "email": "temp_9148683555@gmail.com",
    "password": "temp@9148683555",
    "phone": "9148683555",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9148683555",
      "alternateContact": "7019854834",
      "whatsappNumber": "9148683555",
      "address": "GRT jewllery, TNR Layout, 3rd Cross Rd, Aswath Nagar, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Yogi",
    "email": "temp_9353635623@gmail.com",
    "password": "temp@9353635623",
    "phone": "9353635623",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9353635623",
      "alternateContact": "7019854834",
      "whatsappNumber": "9353635623",
      "address": "149, Annapurna PG for Ladies 7th cross, 1st Main Rd, Aswath Nagar, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Kannada"
      ]
    }
  },
  {
    "name": "Sunitha",
    "email": "temp_8096865926@gmail.com",
    "password": "temp@8096865926",
    "phone": "8096865926",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8096865926",
      "alternateContact": "7019854834",
      "whatsappNumber": "8096865926",
      "address": "Vindhya Residency, 18, 1st Cross Rd, Lakshmi Layout, Gandhi Nagar, Munnekollal, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Subbu",
    "email": "temp_8050335678@gmail.com",
    "password": "temp@8050335678",
    "phone": "8050335678",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8050335678",
      "alternateContact": "7019854834",
      "whatsappNumber": "8050335678",
      "address": "HP Gas Road, 8, 1st Cross St, Ramanjaneya Layout, Aswath Nagar, Marathahalli, Bengaluru, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Yogi",
    "email": "temp_9353635623@gmail.com",
    "password": "temp@9353635623",
    "phone": "9353635623",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9353635623",
      "alternateContact": "7019854834",
      "whatsappNumber": "9353635623",
      "address": "119, 1st cross, 3rd main, Hemanth Nagar, Marathahalli, Bengaluru, Banglore, Karnataka 560037",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Kannada"
      ]
    }
  },
  {
    "name": "Ganesh",
    "email": "temp_9845740488@gmail.com",
    "password": "temp@9845740488",
    "phone": "9845740488",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9845740488",
      "alternateContact": "7019854834",
      "whatsappNumber": "9845740488",
      "address": "Koramangala - 6th Block, Patel Narayana Reddy layout, 3rd Cross Rd, 6th Block, Koramangala, Bengaluru, Karnataka 560095",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Chaithanya",
    "email": "temp_7892711169@gmail.com",
    "password": "temp@7892711169",
    "phone": "7892711169",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7892711169",
      "alternateContact": "7019854834",
      "whatsappNumber": "7892711169",
      "address": "Koramangala - 4th Block, B Block, No. 22, Shivaparvathi Nilaya, near BDA complex, Koramangala, Bengaluru, Karnataka 560034",
      "languagesSpokenByHost": [
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Jithendra",
    "email": "temp_7411699581@gmail.com",
    "password": "temp@7411699581",
    "phone": "7411699581",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7411699581",
      "alternateContact": "7019854834",
      "whatsappNumber": "7411699581",
      "address": "Koramangala - 5th Block, 200, 4th Cross Rd, KHB Block Koramangala, 5th Block, Koramangala, Bengaluru, Karnataka 560047",
      "languagesSpokenByHost": [
        "Hindi"
      ]
    }
  },
  {
    "name": "Surya Narayana Reddy",
    "email": "temp_9742348629@gmail.com",
    "password": "temp@9742348629",
    "phone": "9742348629",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9742348629",
      "alternateContact": "7019854834",
      "whatsappNumber": "9742348629",
      "address": "Koramangala - 6th Block, Door No. 832, 17th F Main Rd, beside Koramangala Club Swimming Pool, 6th Block, Koramangala, Bengaluru, Karnataka 560095",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Shyam",
    "email": "temp_7353561809@gmail.com",
    "password": "temp@7353561809",
    "phone": "7353561809",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7353561809",
      "alternateContact": "7019854834",
      "whatsappNumber": "7353561809",
      "address": "Koramangala - 8th Block, 470, Adugodi Main Rd, Koramangala 8th Block, Koramangala, Bengaluru, Karnataka 560095",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Amarnath",
    "email": "temp_7483592376@gmail.com",
    "password": "temp@7483592376",
    "phone": "7483592376",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7483592376",
      "alternateContact": "7019854834",
      "whatsappNumber": "7483592376",
      "address": "18-4/2, 4th cross, 100 Feet Rd, Vivek Nagar, Chandra Reddy Layout, S T Bed Layout, Koramangala, Bengaluru, Karnataka 560095",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Kannada"
      ]
    }
  },
  {
    "name": "Gopi Reddy",
    "email": "temp_9071234546@gmail.com",
    "password": "temp@9071234546",
    "phone": "9071234546",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9071234546",
      "alternateContact": "7019854834",
      "whatsappNumber": "9071234546",
      "address": "AVS COMPOUND, 35, near Sony signal, behind GKB OPTICAL shop, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Lakshmi",
    "email": "temp_8147448111@gmail.com",
    "password": "temp@8147448111",
    "phone": "8147448111",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8147448111",
      "alternateContact": "7019854834",
      "whatsappNumber": "8147448111",
      "address": "268, 2nd Cross Rd, near Forum Mall, 7th Block, Koramangala, Bengaluru, Karnataka 560095",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Anthara",
    "email": "temp_7090707009@gmail.com",
    "password": "temp@7090707009",
    "phone": "7090707009",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7090707009",
      "alternateContact": "7019854834",
      "whatsappNumber": "7090707009",
      "address": "3rd Cross Rd, Tavarekere Main Rd, Kaveri Layout, S.G. Palya, Bengaluru, Karnataka 560029",
      "languagesSpokenByHost": [
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Shilpa",
    "email": "temp_9900766337@gmail.com",
    "password": "temp@9900766337",
    "phone": "9900766337",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9900766337",
      "alternateContact": "7019854834",
      "whatsappNumber": "9900766337",
      "address": "Indiranagar - BBMP Park, No 271/1, 14th Cross, Chinmaya Mission Hospital Rd, Indiranagar, Bengaluru, Karnataka 560038",
      "languagesSpokenByHost": [
        "English"
      ]
    }
  },
  {
    "name": "Shilpa",
    "email": "temp_9900766337@gmail.com",
    "password": "temp@9900766337",
    "phone": "9900766337",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9900766337",
      "alternateContact": "7019854834",
      "whatsappNumber": "9900766337",
      "address": "Indiranagar - HAL 2nd Stage, 10 ,13th Main Rd, 1st Cross Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008",
      "languagesSpokenByHost": [
        "English"
      ]
    }
  },
  {
    "name": "Sai Kumar",
    "email": "temp_7702782796@gmail.com",
    "password": "temp@7702782796",
    "phone": "7702782796",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7702782796",
      "alternateContact": "7019854834",
      "whatsappNumber": "7702782796",
      "address": "Indiranagar - Appareddy Palya Rd, 69,Hal 2nd stage ,double road, near esi hospital, Indiranagar, Bengaluru, Karnataka 560038",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Nagaeswera",
    "email": "temp_9705060795@gmail.com",
    "password": "temp@9705060795",
    "phone": "9705060795",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9705060795",
      "alternateContact": "7019854834",
      "whatsappNumber": "9705060795",
      "address": "Indiranagar - Stage 3, nlr ladies pg, 1642, 11th Main Rd, HAL 3rd Stage, Kodihalli, Bengaluru, Karnataka 560008",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Dal Singh",
    "email": "temp_7411801711@gmail.com",
    "password": "temp@7411801711",
    "phone": "7411801711",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7411801711",
      "alternateContact": "7019854834",
      "whatsappNumber": "7411801711",
      "address": "814, 10A main Road Stage, Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038",
      "languagesSpokenByHost": [
        "Hindi"
      ]
    }
  },
  {
    "name": "Anil Kumar",
    "email": "temp_7093929452@gmail.com",
    "password": "temp@7093929452",
    "phone": "7093929452",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7093929452",
      "alternateContact": "7019854834",
      "whatsappNumber": "7093929452",
      "address": "1339, 11th Cross Rd, Stage 3, Indiranagar, Bengaluru, Karnataka 560038",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Anil Kumar",
    "email": "temp_7093929452@gmail.com",
    "password": "temp@7093929452",
    "phone": "7093929452",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7093929452",
      "alternateContact": "7019854834",
      "whatsappNumber": "7093929452",
      "address": "Beside Ladies PG, 1339, 11th Cross Rd, Stage 3, Indiranagar, Bengaluru, Karnataka 560038",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Sreenivas Reddy",
    "email": "temp_8610186413@gmail.com",
    "password": "temp@8610186413",
    "phone": "8610186413",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8610186413",
      "alternateContact": "7019854834",
      "whatsappNumber": "8610186413",
      "address": "Bandiappa Compound, 34/3, Channakesahava Nagar, HAL 2nd Stage, Doopanahalli, Indiranagar, Bengaluru, Karnataka 560008",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi"
      ]
    }
  },
  {
    "name": "Raj Mohan",
    "email": "temp_9535157106@gmail.com",
    "password": "temp@9535157106",
    "phone": "9535157106",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9535157106",
      "alternateContact": "7019854834",
      "whatsappNumber": "9535157106",
      "address": "http://h.no/ :12, Vasavi Enclave, Sree Sathyanarayana temple St, Halasuru, Gupta Layout, Bengaluru, Karnataka 560008",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Sudhakar Reddy",
    "email": "temp_8951253900@gmail.com",
    "password": "temp@8951253900",
    "phone": "8951253900",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8951253900",
      "alternateContact": "7019854834",
      "whatsappNumber": "8951253900",
      "address": "106, Jogupalya Rd, Halasuru, Udani Layout, Bengaluru, Karnataka 560008",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi"
      ]
    }
  },
  {
    "name": "Vasantha",
    "email": "temp_9113970265@gmail.com",
    "password": "temp@9113970265",
    "phone": "9113970265",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9113970265",
      "alternateContact": "7019854834",
      "whatsappNumber": "9113970265",
      "address": "Mahadevapura, 1st main. 10 th cross Garudacharplaya Brigade metropolis,phoenix mall, Mahadevapura, Bengaluru, Karnataka 560048",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi",
        "Kannada",
        "Tamil"
      ]
    }
  },
  {
    "name": "Prakash",
    "email": "temp_9699749699@gmail.com",
    "password": "temp@9699749699",
    "phone": "9699749699",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9699749699",
      "alternateContact": "7019854834",
      "whatsappNumber": "9699749699",
      "address": "Mahadevapura,31, 3rd Cross Rd, Kamadhenu Nagar, B Narayanapura, Mahadevapura, Bengaluru, Karnataka 560048",
      "languagesSpokenByHost": [
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Manoj Reddy",
    "email": "temp_8123241101@gmail.com",
    "password": "temp@8123241101",
    "phone": "8123241101",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8123241101",
      "alternateContact": "7019854834",
      "whatsappNumber": "8123241101",
      "address": "33, Sathya Layout, B Narayanapura, Mahadevapura, Bengaluru, Karnataka 560016",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Ramana Reddy",
    "email": "temp_8105253729@gmail.com",
    "password": "temp@8105253729",
    "phone": "8105253729",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8105253729",
      "alternateContact": "7019854834",
      "whatsappNumber": "8105253729",
      "address": "55, 4th B Cross, 5th Phase, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Jithesh Reddy",
    "email": "temp_9632027464@gmail.com",
    "password": "temp@9632027464",
    "phone": "9632027464",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9632027464",
      "alternateContact": "7019854834",
      "whatsappNumber": "9632027464",
      "address": "Mahadevapura,No-31, Ramakrishna reddy layout, B Narayanapura, Mahadevapura, Bengaluru, Karnataka 560048",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Harish",
    "email": "temp_9525388888@gmail.com",
    "password": "temp@9525388888",
    "phone": "9525388888",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9525388888",
      "alternateContact": "7019854834",
      "whatsappNumber": "9525388888",
      "address": "Mahadevapura,17, XMQX+32R Krishna garden, Sparkling Nest Rd, Garudachar Palya, Mahadevapura, Bengaluru, Karnataka 560048",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Bavadish",
    "email": "temp_7348819734@gmail.com",
    "password": "temp@7348819734",
    "phone": "7348819734",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7348819734",
      "alternateContact": "7019854834",
      "whatsappNumber": "7348819734",
      "address": "Mahadevapura,64 Saraswathi Nagar 5th Cross ,Maheshwaramma Temple Road, Outer Ring Rd, Mahadevapura, Bengaluru, Karnataka 560048",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Sai",
    "email": "temp_9985627460@gmail.com",
    "password": "temp@9985627460",
    "phone": "9985627460",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9985627460",
      "alternateContact": "7019854834",
      "whatsappNumber": "9985627460",
      "address": "BTM - Tavarekere, 37, 1st cross, Chocolate Factory Rd, opp. swaraj Hyper market, Tavarekere, Cashier Layout, Bengaluru, Karnataka 560029",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada",
        "Tamil"
      ]
    }
  },
  {
    "name": "Janardhan Reddy",
    "email": "temp_8008453338@gmail.com",
    "password": "temp@8008453338",
    "phone": "8008453338",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8008453338",
      "alternateContact": "7019854834",
      "whatsappNumber": "8008453338",
      "address": "BTM -8th cross Rd, 99 20th main road, 8th Cross Rd, BTM Layout, Bengaluru, Karnataka 560068",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Kannada"
      ]
    }
  },
  {
    "name": "Janardhan Reddy",
    "email": "temp_8008453338@gmail.com",
    "password": "temp@8008453338",
    "phone": "8008453338",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8008453338",
      "alternateContact": "7019854834",
      "whatsappNumber": "8008453338",
      "address": "BTM -8th cross Rd, 67 20th Main road, 8th Cross Rd, BTM Layout, Bengaluru, Karnataka 560068",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Kannada"
      ]
    }
  },
  {
    "name": "Praveen",
    "email": "temp_8553406098@gmail.com",
    "password": "temp@8553406098",
    "phone": "8553406098",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8553406098",
      "alternateContact": "7019854834",
      "whatsappNumber": "8553406098",
      "address": "BTM - 2nd Stage,18, 5th Main Rd, NS Palya, BTM 2nd Stage, BTM Layout, Bengaluru, Karnataka 560076",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Shyam",
    "email": "temp_8886562894@gmail.com",
    "password": "temp@8886562894",
    "phone": "8886562894",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8886562894",
      "alternateContact": "7019854834",
      "whatsappNumber": "8886562894",
      "address": "BTM - 1st Stage, 17/1, 2nd cross, Maruthi Nagar Main Rd, near Srinivasa Temple Road, Madiwala, BTM 1st Stage, Bengaluru, Karnataka 560029",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Jithendra",
    "email": "temp_9036019315@gmail.com",
    "password": "temp@9036019315",
    "phone": "9036019315",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9036019315",
      "alternateContact": "7019854834",
      "whatsappNumber": "9036019315",
      "address": "vishveshvarya cooperative bank, 264,6th main, 4th Cross Rd, opp. to ashirwad super market, Mico Layout, BTM 2nd Stage, Bengaluru, Karnataka 560076",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada",
        "Tamil"
      ]
    }
  },
  {
    "name": "Host",
    "email": "temp_7676785098@gmail.com",
    "password": "temp@7676785098",
    "phone": "7676785098",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7676785098",
      "alternateContact": "7019854834",
      "whatsappNumber": "7676785098",
      "address": "25th, 3rd Main Rd, Old Madiwala, Jay Bheema Nagar, 1st Stage, BTM 1st Stage, Bengaluru, Karnataka 560068",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Chandrakanth",
    "email": "temp_9740897879@gmail.com",
    "password": "temp@9740897879",
    "phone": "9740897879",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9740897879",
      "alternateContact": "7019854834",
      "whatsappNumber": "9740897879",
      "address": "10, 7th cross, 20th Main Rd, Madiwala, BTM 1st Stage, Bengaluru, Karnataka 560068",
      "languagesSpokenByHost": [
        "English",
        "Tamil"
      ]
    }
  },
  {
    "name": "Chandrakanth",
    "email": "temp_8310005125@gmail.com",
    "password": "temp@8310005125",
    "phone": "8310005125",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8310005125",
      "alternateContact": "7019854834",
      "whatsappNumber": "8310005125",
      "address": "2, 2nd Cross Rd, Old Madiwala, Jay Bheema Nagar, 1st Stage, BTM 1st Stage, Bengaluru, Karnataka 560068",
      "languagesSpokenByHost": [
        "English",
        "Tamil"
      ]
    }
  },
  {
    "name": "Giri",
    "email": "temp_9866675469@gmail.com",
    "password": "temp@9866675469",
    "phone": "9866675469",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9866675469",
      "alternateContact": "7019854834",
      "whatsappNumber": "9866675469",
      "address": "Whitefield,  XP9P+WHQ, Nallurhalli, Whitefield, Bengaluru, Karnataka 560066",
      "languagesSpokenByHost": [
        "Malyalam",
        "Hindi",
        "Kannada",
        "Tamil"
      ]
    }
  },
  {
    "name": "Uday",
    "email": "temp_9890982226@gmail.com",
    "password": "temp@9890982226",
    "phone": "9890982226",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9890982226",
      "alternateContact": "7019854834",
      "whatsappNumber": "9890982226",
      "address": "438,joseph school to ujjawal school road, Pattandur Gutta Kanakadasa Rd, Inner Valley, Whitefield, Bengaluru, Karnataka 560066",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Sandeep",
    "email": "temp_9916369009@gmail.com",
    "password": "temp@9916369009",
    "phone": "9916369009",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9916369009",
      "alternateContact": "7019854834",
      "whatsappNumber": "9916369009",
      "address": "Flat 3C, XPJW+CPP HR Residency, Pattandur Agrahara 1st Main Rd, White Rose Layout, Whitefield, Bengaluru, Karnataka 560066",
      "languagesSpokenByHost": [
        "English"
      ]
    }
  },
  {
    "name": "Lakshmi",
    "email": "temp_9111849994@gmail.com",
    "password": "temp@9111849994",
    "phone": "9111849994",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9111849994",
      "alternateContact": "7019854834",
      "whatsappNumber": "9111849994",
      "address": "Swami Vivekananda Road, opp. Chaitanya Villas, Prasanth Layout, Extension, Whitefield, Bengaluru, Karnataka 560066",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Adi Reddy",
    "email": "temp_9513856789@gmail.com",
    "password": "temp@9513856789",
    "phone": "9513856789",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9513856789",
      "alternateContact": "7019854834",
      "whatsappNumber": "9513856789",
      "address": "Site No. 10 & 11, ITPL Back Gate, 2nd Right End, Road, near Guru Sri Wines, Pattandur Agrahara, Whitefield, Bengaluru, Karnataka 560066",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada",
        "Tamil"
      ]
    }
  },
  {
    "name": "Suresh Reddy",
    "email": "temp_9019640225@gmail.com",
    "password": "temp@9019640225",
    "phone": "9019640225",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9019640225",
      "alternateContact": "7019854834",
      "whatsappNumber": "9019640225",
      "address": "5/5,1st main, beside Keva Ayurvedha, Pattandur Agrahara Abhayadhama Rd, Pattandur Agrahara Chandrodaya Rd, Happy Valley, Bengaluru, Karnataka 560066",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Lakshmi",
    "email": "temp_8123999859@gmail.com",
    "password": "temp@8123999859",
    "phone": "8123999859",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8123999859",
      "alternateContact": "7019854834",
      "whatsappNumber": "8123999859",
      "address": "1, Nallurahalli Main Rd, Nallurhalli, Whitefield, Bengaluru, Karnataka 560066",
      "languagesSpokenByHost": [
        "Telugu",
        "English"
      ]
    }
  },
  {
    "name": "Akhil",
    "email": "temp_9555549994@gmail.com",
    "password": "temp@9555549994",
    "phone": "9555549994",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9555549994",
      "alternateContact": "7019854834",
      "whatsappNumber": "9555549994",
      "address": "10, Pattandur Agrahara Swamy Vivekananda Rd, opp. Chaitanya Villas, Prasanth Layout, Prasanth Extension, Whitefield, Bengaluru, Karnataka 560066",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Suresh",
    "email": "temp_8639469229@gmail.com",
    "password": "temp@8639469229",
    "phone": "8639469229",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8639469229",
      "alternateContact": "7019854834",
      "whatsappNumber": "8639469229",
      "address": "144, 4th cross, ITPL Main Rd, near ITPL, Prasanth Layout, Prasanth Extension, Bengaluru, Karnataka 560066",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Gangadhar",
    "email": "temp_8985951812@gmail.com",
    "password": "temp@8985951812",
    "phone": "8985951812",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "8985951812",
      "alternateContact": "7019854834",
      "whatsappNumber": "8985951812",
      "address": "B NO #10 ,Layout No.41, Christella Villa, Whitefield Main Rd, near ICICI Bank, off road Hope Farm Signal, Ambedkar Nagar, Whitefield, Bengaluru, Karnataka 560066",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi",
        "Kannada",
        "Tamil"
      ]
    }
  },
  {
    "name": "Ramana Reddy",
    "email": "temp_9972144644@gmail.com",
    "password": "temp@9972144644",
    "phone": "9972144644",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9972144644",
      "alternateContact": "7019854834",
      "whatsappNumber": "9972144644",
      "address": "Electronic City - Phase I,255, 2nd Cross Rd, Neeladri Nagar, Electronic City Phase I, Electronic City, Bengaluru, Karnataka 560100",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi",
        "Kannada",
        "Tamil"
      ]
    }
  },
  {
    "name": "Eswar",
    "email": "temp_7259563717@gmail.com",
    "password": "temp@7259563717",
    "phone": "7259563717",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7259563717",
      "alternateContact": "7019854834",
      "whatsappNumber": "7259563717",
      "address": "Electronic City - Phase I,69, 15th Cross Road, Neeladri Nagar, Electronic City Phase I, Electronic City, Bengaluru, Karnataka 560100",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Suresh",
    "email": "temp_7760888889@gmail.com",
    "password": "temp@7760888889",
    "phone": "7760888889",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7760888889",
      "alternateContact": "7019854834",
      "whatsappNumber": "7760888889",
      "address": "Electronic City - Phase I,RJQW+JVJ, 666, 4th A CROSS, Neeladri Nagar, Electronic City Phase I, Electronic City, Bengaluru, Karnataka 560100",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi"
      ]
    }
  },
  {
    "name": "Nagarjuna Reddy",
    "email": "temp_6302806521@gmail.com",
    "password": "temp@6302806521",
    "phone": "6302806521",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "6302806521",
      "alternateContact": "7019854834",
      "whatsappNumber": "6302806521",
      "address": "Electronic City - Phase I,676, 4th A Cross Road, Neeladri Nagar, Electronic City Phase I, Electronic City, Bengaluru, Karnataka 560100",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Rajesh",
    "email": "temp_9008699595@gmail.com",
    "password": "temp@9008699595",
    "phone": "9008699595",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9008699595",
      "alternateContact": "7019854834",
      "whatsappNumber": "9008699595",
      "address": "Electronic City - Phase II, 5, 6th Main Rd, Naidu Layout, Shanthi Pura, Phase II, Electronic City, Bengaluru, Karnataka 560100",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Sanjeeva",
    "email": "temp_9493794737@gmail.com",
    "password": "temp@9493794737",
    "phone": "9493794737",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9493794737",
      "alternateContact": "7019854834",
      "whatsappNumber": "9493794737",
      "address": "250, Sri Akshitha Arcade, 2nd Cross Rd, Neeladri Nagar, Electronic City Phase I, Bengaluru, Karnataka 560100",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Konda Reddy",
    "email": "temp_9701525161@gmail.com",
    "password": "temp@9701525161",
    "phone": "9701525161",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9701525161",
      "alternateContact": "7019854834",
      "whatsappNumber": "9701525161",
      "address": "308, 6th Cross Road, Neeladri Nagar, Electronic City Phase I, Doddathoguru, Bengaluru, Karnataka 560100",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Aishwarya",
    "email": "temp_9972136363@gmail.com",
    "password": "temp@9972136363",
    "phone": "9972136363",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9972136363",
      "alternateContact": "7019854834",
      "whatsappNumber": "9972136363",
      "address": "341, 6th Cross Road, Neeladri Nagar, Electronic City Phase I, Electronic City, Bengaluru, Karnataka 560100",
      "languagesSpokenByHost": [
        "Telugu",
        "English",
        "Hindi",
        "Kannada",
        "Tamil"
      ]
    }
  },
  {
    "name": "Keshavam",
    "email": "temp_7569597035@gmail.com",
    "password": "temp@7569597035",
    "phone": "7569597035",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7569597035",
      "alternateContact": "7019854834",
      "whatsappNumber": "7569597035",
      "address": "622, 5th Cross Road, near Ram Medical, Neeladri Nagar, Electronic City Phase I, Electronic City, Bengaluru, Karnataka 560100",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi"
      ]
    }
  },
  {
    "name": "Chenna Reddy",
    "email": "temp_9980331249@gmail.com",
    "password": "temp@9980331249",
    "phone": "9980331249",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9980331249",
      "alternateContact": "7019854834",
      "whatsappNumber": "9980331249",
      "address": "439, 10th Cross Road, Neeladri Nagar, Electronic City Phase I, Electronic City, Doddathoguru, Karnataka 560100",
      "languagesSpokenByHost": [
        "Telugu",
        "Hindi"
      ]
    }
  },
  {
    "name": "Anjali",
    "email": "temp_9845289217@gmail.com",
    "password": "temp@9845289217",
    "phone": "9845289217",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9845289217",
      "alternateContact": "7019854834",
      "whatsappNumber": "9845289217",
      "address": "NO 153, Guru krupa, Infosys Gate 6, 6th Main Rd, 1, 1, konnapa agrahara, Electronic City, Bengaluru, Karnataka 560100",
      "languagesSpokenByHost": [
        "English",
        "Hindi",
        "Kannada"
      ]
    }
  },
  {
    "name": "Mohan",
    "email": "temp_9902049002@gmail.com",
    "password": "temp@9902049002",
    "phone": "9902049002",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "9902049002",
      "alternateContact": "7019854834",
      "whatsappNumber": "9902049002",
      "address": "Bellandur, 118, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103",
      "languagesSpokenByHost": [
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Anthara",
    "email": "temp_7090707009@gmail.com",
    "password": "temp@7090707009",
    "phone": "7090707009",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7090707009",
      "alternateContact": "7019854834",
      "whatsappNumber": "7090707009",
      "address": "Bannerghatta Main Rd, Pai Layout, Hulimavu, Bengaluru, Karnataka 560076",
      "languagesSpokenByHost": [
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Anthara",
    "email": "temp_7090707009@gmail.com",
    "password": "temp@7090707009",
    "phone": "7090707009",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7090707009",
      "alternateContact": "7019854834",
      "whatsappNumber": "7090707009",
      "address": "Christ university, 7, 1st Main Rd, opp. Hanuman Mandir, DRC Post, Venkateshwara Layout, S.G. Palya, Bengaluru, Karnataka 560029",
      "languagesSpokenByHost": [
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Anthara",
    "email": "temp_7090707009@gmail.com",
    "password": "temp@7090707009",
    "phone": "7090707009",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7090707009",
      "alternateContact": "7019854834",
      "whatsappNumber": "7090707009",
      "address": "Near Majestic, 11 5th Cross, Magadi Main Rd, KP Agrahara, Bengaluru, Karnataka 560023",
      "languagesSpokenByHost": [
        "English",
        "Hindi"
      ]
    }
  },
  {
    "name": "Anthara",
    "email": "temp_7090707009@gmail.com",
    "password": "temp@7090707009",
    "phone": "7090707009",
    "image": "https://i.pinimg.com/1200x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg",
    "hostProfile": {
      "contactNumber": "7090707009",
      "alternateContact": "7019854834",
      "whatsappNumber": "7090707009",
      "address": "No. 18, Ground Floor, K. V. Lane, Cross, Cottonpete, Bengaluru, Karnataka 560053",
      "languagesSpokenByHost": [
        "English",
        "Hindi"
      ]
    }
  }
]

/**
 * Sequential processing: Create user, get ID, create host profile immediately
 */
const createHostWithProfile = async (host: HostData): Promise<boolean> => {
    try {
        console.log(`🔄 Creating host: ${host.name} (${host.email})`);

        // Step 1: Create user account via Better Auth
        const { data, error } = await authClient.signUp.email(
            {
                email: host.email,
                password: host.password,
                name: host.name,
                phone: host.phone,
            },
            {
                onRequest: (ctx) => {
                    console.log("Creating Account for Host:", host.name);
                },
                onSuccess: (ctx) => {
                    console.log("Account Created for Host:", host.name);
                },
                onError: (ctx) => {
                    console.error("Account Creation Failed for Host:", host.name, ctx.error.message);
                },
            }
        );

        if (error) {
            console.error(`❌ Auth creation failed for ${host.name}:`, error.message);
            return false;
        }

        if (!data?.user?.id) {
            console.error(`❌ No user ID returned for ${host.name}`);
            return false;
        }

        console.log(`✅ User account created for ${host.name}`);

        // Step 2: Update the role manually
        await prisma.user.update({
            where: { id: data.user.id },
            data: { role: UserRole.host }
        });

        console.log(`✅ Role updated to host for ${host.name}`);

        // Step 3: Create host profile with the actual user ID
        const hostProfile = await prisma.hostProfile.create({
            data: {
                userId: data.user.id,
                contactNumber: host.hostProfile.contactNumber,
                alternateContact: host.hostProfile.alternateContact,
                whatsApp: host.hostProfile.whatsappNumber,
                Address: host.hostProfile.address,
                languagesSpokenByHost: host.hostProfile.languagesSpokenByHost,
            }
        });

        console.log(`✅ Host profile created for ${host.name}: ${hostProfile.id}\n`);
        return true;

    } catch (error) {
        console.error(`💥 Unexpected error creating host ${host.name}:`, error);
        return false;
    }
};

/**
 * Create all hosts sequentially (recommended approach)
 */
const createAllHostsSequentially = async (): Promise<void> => {
    console.log(`🚀 Starting sequential creation of ${hostData.length} hosts...\n`);

    let successCount = 0;
    let failureCount = 0;
    const failures: string[] = [];

    for (let i = 0; i < hostData.length; i++) {
        const host = hostData[i];
        const progress = `[${i + 1}/${hostData.length}]`;
        
        console.log(`${progress} Processing ${host.name}...`);

        const success = await createHostWithProfile(host);
        
        if (success) {
            successCount++;
            console.log(`${progress} ✅ SUCCESS: ${host.name}`);
        } else {
            failureCount++;
            failures.push(host.name);
            console.log(`${progress} ❌ FAILED: ${host.name}`);
        }

        // Small delay to avoid overwhelming the auth service
        if (i < hostData.length - 1) {
            console.log("⏳ Waiting 2 seconds before next host...\n");
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    // Final summary
    console.log(`\n🎉 SEQUENTIAL CREATION COMPLETED`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failureCount}`);
    
    if (failures.length > 0) {
        console.log(`\n📋 Failed hosts:`);
        failures.forEach(name => console.log(`   - ${name}`));
    }
};

/**
 * Alternative: Batch creation (create users first, then profiles)
 */
const createAllHostsBatch = async (): Promise<void> => {
    console.log(`🚀 Starting BATCH MODE creation...\n`);

    // Step 1: Create all users first
    console.log(`📝 Creating ${hostData.length} user accounts...`);
    const userResults: { host: HostData; userId?: string; success: boolean }[] = [];
    
    for (const host of hostData) {
        console.log(`🔄 Creating user: ${host.name}`);
        
        const { data, error } = await authClient.signUp.email(
            {
                email: host.email,
                password: host.password,
                name: host.name,
                phone: host.phone,
            },
            {
                onRequest: (ctx) => {
                    console.log("Creating Account for Host:", host.name);
                },
                onSuccess: (ctx) => {
                    console.log("Account Created for Host:", host.name);
                },
                onError: (ctx) => {
                    console.error("Account Creation Failed for Host:", host.name, ctx.error.message);
                },
            }
        );

        if (error) {
            console.error(`❌ Failed to create user ${host.name}:`, error.message);
            userResults.push({ host, success: false });
        } else if (data?.user?.id) {
            // Update role to host
            await prisma.user.update({
                where: { id: data.user.id },
                data: { role: UserRole.host }
            });
            
            console.log(`✅ Created user: ${host.name} with ID: ${data.user.id}`);
            userResults.push({ host, userId: data.user.id, success: true });
        } else {
            console.error(`❌ No user ID returned for ${host.name}`);
            userResults.push({ host, success: false });
        }

        // Small delay
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Step 2: Create host profiles for successful users
    console.log(`\n🏠 Creating host profiles...`);
    const successfulUsers = userResults.filter(result => result.success && result.userId);
    
    for (const result of successfulUsers) {
        try {
            const hostProfile = await prisma.hostProfile.create({
                data: {
                    userId: result.userId!,
                    contactNumber: result.host.hostProfile.contactNumber,
                    alternateContact: result.host.hostProfile.alternateContact,
                    whatsApp: result.host.hostProfile.whatsappNumber,
                    Address: result.host.hostProfile.address,
                    languagesSpokenByHost: result.host.hostProfile.languagesSpokenByHost,
                }
            });

            console.log(`✅ Created host profile for ${result.host.name}: ${hostProfile.id}`);
        } catch (error) {
            console.error(`❌ Error creating host profile for ${result.host.name}:`, error);
        }
    }

    console.log(`\n✅ Batch creation completed! Created ${successfulUsers.length} host profiles.`);
};

/**
 * Utility function to check existing hosts
 */
const checkExistingHosts = async (): Promise<void> => {
    const emails = hostData.map(h => h.email);
    const existingUsers = await prisma.user.findMany({
        where: { email: { in: emails } },
        select: { email: true, name: true, role: true }
    });

    if (existingUsers.length > 0) {
        console.log(`⚠️  WARNING: Found ${existingUsers.length} existing users:`);
        existingUsers.forEach(u => console.log(`   - ${u.name} (${u.email}) - Role: ${u.role}`));
        console.log(`\nYou may want to clear these first or skip them.\n`);
    } else {
        console.log(`✅ No existing users found. Ready to proceed.\n`);
    }
};

/**
 * Main execution function
 */
const main = async (): Promise<void> => {
    const args = process.argv.slice(2);
    const mode = args[0] || 'sequential';

    try {
        console.log("🎯 LookaroundPG Host Creation Script\n");
        
        // Check for existing hosts first
        await checkExistingHosts();

        switch (mode) {
            case 'sequential':
                await createAllHostsSequentially();
                break;
            case 'check':
                console.log('✅ Check completed.');
                break;
            default:
                console.log(`
Usage: tsx scripts/create-host.ts [mode]

Modes:
  sequential  - Create hosts one by one (default, safer)
  check      - Only check for existing hosts

Examples:
  tsx scripts/create-host.ts sequential
  tsx scripts/create-host.ts check
                `);
        }
    } catch (error) {
        console.error('💥 Critical error:', error);
    } finally {
        await prisma.$disconnect();
        console.log('\n👋 Database connection closed.');
    }
};

// Execute the script
main();