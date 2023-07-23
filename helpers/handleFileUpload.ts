export function handleFileUpload(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files
  if(!files) return null

  return files[0]
}
export function getBase64(file: File) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   const wrapper = new Promise<string | ArrayBuffer | null>((resolve, reject)=>{
     reader.onload = function () {
       resolve(reader.result)
     };
     reader.onerror = function (error) {
       reject(error)
     };
   })
   return wrapper
}