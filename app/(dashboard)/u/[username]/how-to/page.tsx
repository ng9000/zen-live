import { HowToCard } from "./_components/how-to-card";

const HowToStream = () => {
  const infoData = [
    {
      title: "Generate keys",
      description: (
        <>
          <li>
            Open keys from sidebar and generate new pair of connection for your
            streams.
          </li>
          <li>Now copy the newly generated server URL and stream key.</li>
          <li className="text-red-500">
            Make sure if a stream is running and you generate new keys the
            stream will be terminated.
          </li>
        </>
      ),
      image: "/images/keys-how-to.png",
    },
    {
      title: "Paste keys in OBS",
      description: (
        <>
          <li>Open OBS</li>
          <li>Now go to settings and stream.</li>
          <li>Now select custom service</li>
          <li>Now paste your stream url and stream key in respective tabs</li>
          <li>Click Ok and start streaming</li>
        </>
      ),
      image: "/images/obs-how-to.png",
    },
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">How to start a stream?</h1>
      <div className="gap-10 lg:grid lg:grid-cols-2">
        {infoData.map((data) => (
          <HowToCard
            key={data.image}
            description={data.description}
            image={data.image}
            title={data.title}
          />
        ))}
      </div>
    </div>
  );
};

export default HowToStream;
