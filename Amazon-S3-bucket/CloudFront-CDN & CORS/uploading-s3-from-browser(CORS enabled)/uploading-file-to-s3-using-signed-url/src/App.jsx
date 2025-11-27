import "./App.css";

function App() {
  const handleFileUpload = async (e) => {
    await fetch(
      "https://varun-personal-stuff.s3.ap-south-1.amazonaws.com/1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3ZDM7GDZNPNEBLWI%2F20251127%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20251127T082436Z&X-Amz-Expires=3600&X-Amz-Signature=51005cc6ef338205530f38cc4c53152e668885387c03559dca96a85d371d36fb&X-Amz-SignedHeaders=content-type%3Bhost&x-amz-checksum-crc32=AAAAAA%3D%3D&x-amz-sdk-checksum-algorithm=CRC32&x-id=PutObject",
      {
        method: "PUT",
        body: e.target.files[0],
      }
    );
    console.log("File uploaded");
  };
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default App;
