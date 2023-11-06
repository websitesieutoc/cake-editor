import { __GROUP_MODEL__, __PRIMITIVE_MODEL__ } from "./constants";
import { ModelType, THREE_MESH } from "./types";

export const getGroupObjectSelected = (
   obj:
      | THREE_MESH
      | THREE.Group
      | THREE.Object3D<THREE.Object3DEventMap>
      | undefined
):
   | THREE_MESH
   | THREE.Group
   | THREE.Object3D<THREE.Object3DEventMap>
   | undefined => {
   if (!obj) return undefined;
   if (!obj.parent) return obj;
   return obj.parent;
};

function levenshteinDistance(a: string, b: string) {
   if (a.length === 0) return b.length;
   if (b.length === 0) return a.length;

   const matrix = [];

   for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
   }

   for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
   }

   for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
         if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
         } else {
            matrix[i][j] = Math.min(
               matrix[i - 1][j - 1] + 1,
               Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
            );
         }
      }
   }

   return matrix[b.length][a.length];
}

// Fuzzy search function
export function fuzzySearch(
   array: ModelType[],
   searchValue: string,
   threshold = 3
) {
   return array.filter((item) => {
      // Assuming the property to search is "name"
      const distance = levenshteinDistance(
         searchValue.toLowerCase(),
         item?.name?.toLowerCase() ?? ""
      );
      return distance <= threshold;
   });
}

// Perform a fuzzy search
// const searchResult = fuzzySearch(complexObjectArray, "John", 2);
// console.log(searchResult);

export function getPrimitiveObject(
   obj: THREE_MESH | THREE.Object3D<THREE.Object3DEventMap> | undefined
) {
   if (!obj || !obj.parent) return undefined;
   if (obj.parent?.name === __PRIMITIVE_MODEL__) {
      return obj.parent;
   } else {
      return getPrimitiveObject(obj.parent);
   }
}
export const textToHtml = (text: string) => {
   const elem = document.createElement("div");
   return text
      .split(/\n\n+/)
      .map((paragraph) => {
         return (
            "<p>" +
            paragraph
               .split(/\n+/)
               .map((line) => {
                  elem.textContent = line;
                  return elem.innerHTML;
               })
               .join("<br/>") +
            "</p>"
         );
      })
      .join("");
};
