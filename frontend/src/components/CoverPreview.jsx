export default function CoverPreview({ imageUrl, loading }) {
  if (loading) return <p>Generating preview...</p>;
  if (!imageUrl) return <p>No preview yet</p>;

  return (
    <>
      <img src={imageUrl} alt="Cover Preview" />
      <br /><br />
      <a href={imageUrl} download>
        <button>Download</button>
      </a>
    </>
  );
}
