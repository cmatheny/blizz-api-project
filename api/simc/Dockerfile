FROM blizzapiproject_simc-build
RUN mkdir -p /simc/results /simc/profiles
RUN echo pvg5en7c6k54jrkq2ftsy67cfjcuyyc4 > ~/.simc_apikey
RUN echo '#!/bin/bash' > '/simc/simc.sh'; \
	echo 'echo $1' >> '/simc/simc.sh'; \
	echo '/simc-release/simc armory=us,emerald-dream,$1 html=/simc/results/$1.html' >> '/simc/simc.sh'; \
	ls -l /simc;
RUN chmod 755 /simc/simc.sh
ENTRYPOINT [ "/bin/bash" ]
