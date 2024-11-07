import Image from "next/image";
import { Container } from "../../components/ui/Container";
import { Section } from "../../components/ui/Section";

export default function Integrations() {
  return (
    <Section className="bg-black py-8 lg:pt-12 lg:pb-14">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="space-y-3">
            <h3 className="uppercase text-sm text-white/50 font-mono">Integrations</h3>
            <h2 className="text-lg md:text-xl font-mono uppercase">Standard World Interface</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:h-[50px] mt-8 lg:mt-0">
            <a
              href="https://lattice.xyz/quarry"
              rel="noopener noreferrer"
              target="_blank"
              className="text-sm p-4 leading-none font-mono uppercase bg-[#F1A50E] text-white inline-flex items-center gap-3.5"
            >
              <Image src="/images/logos/quarry-white.svg" alt="Quarry" width={21} height={21} />
              Explore Quarry
            </a>
            <a
              href="https://mud.dev/introduction"
              rel="noopener noreferrer"
              target="_blank"
              className="text-sm p-4 leading-none font-mono uppercase inline-flex items-center gap-3.5 border border-mud text-mud"
            >
              <Image src="/images/logos/mud-transparent.svg" alt="MUD" width={21} height={21} />
              Read MUD docs
            </a>
          </div>
        </div>

        <p className="text-white/70 text-sm mt-8 lg:mt-4 w-full lg:max-w-xl">
          Quarry leverages MUD’s Standard World Interfaces (SWI), which are fully open-source under the mud_* JSON-RPC
          namespace. The SWI covers everything from indexing to pre-confirmations. Quarry is Lattice’s full-stack
          implementation of the Standard World Interface.
        </p>

        <Image
          src="/images/diagrams/swi.svg"
          alt="Standard World Interface"
          width={1148}
          height={401}
          className="mt-6 lg:mt-12"
        />

        <p className="text-xs mt-2 md:mt-4 lg:mt-6 md:text-sm opacity-50 text-center">
          {/* TODO: add description of the diagram */}
          Some description of the diagram goes here.
        </p>
      </Container>
    </Section>
  );
}
