// A GeoJSON fájlból kinyert helyszínek listája
// A poligonoknál a középpontot (centroid) számoltuk ki, a pontoknál az eredeti koordinátát használjuk.
const locations = [
  { name: '001. RWA 5Ha (Full)', lat: 47.872835, lon: 16.360479 },
  { name: '002. Saat 2,34Ha (Full+ idegeneles, Atlantico)', lat: 47.956515, lon: 16.476108 },
  { name: '003. Saat 3,7Ha (Full+ idegeneles, Atlantico)', lat: 47.953540, lon: 16.474513 },
  { name: '004. Saat 5,31Ha (Full+ idegeneles, Rafting)', lat: 47.950483, lon: 16.460002 },
  { name: '005. Saat 2,21Ha (Full+ idegeneles, Rafting)', lat: 47.943892, lon: 16.462611 },
  { name: '006. Saat 2,26Ha (FC, Atlantico)', lat: 47.963378, lon: 16.531119 },
  { name: '007. Saat 2,4Ha (FC, Insanto)', lat: 47.971883, lon: 16.523309 },
  { name: '008. Saat 1,4 (FC, Insanto)', lat: 47.968344, lon: 16.522883 },
  { name: '009. Saat 3,54Ha (FC, Insanto)', lat: 47.967545, lon: 16.522297 },
  { name: '010. Saat 1,79Ha (Full,Insanto)', lat: 47.967601, lon: 16.525965 },
  { name: '011. Saat 0,66Ha (Full, Insanto)', lat: 47.971197, lon: 16.519992 },
  { name: '012. Saat 1,88Ha (FC, Atlantico)', lat: 47.964243, lon: 16.521743 },
  { name: '013. Saat 3,39Ha (FC, Insanto)', lat: 47.968979, lon: 16.511203 },
  { name: '014. Saat 2,65Ha (FC, Insanto)', lat: 47.967389, lon: 16.515530 },
  { name: '015. Saat 5,61Ha (FC, Atlantico)', lat: 47.961529, lon: 16.488045 },
  { name: '016. Saat 1,8Ha (FC, Atlantico)', lat: 47.957705, lon: 16.495044 },
  { name: '017. Saat 3,25Ha (FC, Atlantico)', lat: 47.952908, lon: 16.496957 },
  { name: '018. Saat 4,54Ha (FC, Atlantico)', lat: 47.952702, lon: 16.503303 },
  { name: '019. Saat 3,13Ha (FC, Atlantico)', lat: 47.949295, lon: 16.522872 },
  { name: '020. Saat 3,9ha (FC, Atlantico)', lat: 47.954022, lon: 16.522194 },
  { name: '021. RWA 5,05Ha (Full)', lat: 48.106674, lon: 16.689004 },
  { name: '022. RWA 0,85Ha (Full)', lat: 48.106178, lon: 16.687562 },
  { name: '023. RWA 5,26Ha (Full)', lat: 48.101824, lon: 16.688356 },
  { name: '024. RWA 2,78Ha (Full)', lat: 48.101305, lon: 16.684645 },
  { name: '025. RWA 4,21Ha (Full)', lat: 48.106296, lon: 16.683899 },
  { name: '026. RWA 3,07Ha (Full)', lat: 48.113608, lon: 16.721572 },
  { name: '027. Saat 30Ha (Full)', lat: 48.052408, lon: 16.886477 },
  { name: '028. Saat 3,7Ha (Full , Farmrock)', lat: 48.064648, lon: 16.900863 },
  { name: '029. Saat 3Ha (Full, Farmrock)', lat: 48.070098, lon: 16.903183 },
  { name: '030. RWA 2,07Ha (Full)', lat: 48.075026, lon: 16.777323 },
  { name: '031. RWA 3,75Ha (Full)', lat: 48.076600, lon: 16.775598 },
  { name: '032. RWA 1,67Ha (Full)', lat: 48.073255, lon: 16.775817 },
  { name: '033. RWA 4,8Ha (Full, Dexter)', lat: 48.038157, lon: 16.745180 },
  { name: '034. RWA 3,85Ha (Full)', lat: 48.633197, lon: 16.180969 },
  { name: '035. RWA 0,43Ha (Full)', lat: 48.636126, lon: 16.178482 },
  { name: '036. Saat 7,14Ha (Full)', lat: 48.592209, lon: 16.155705 },
  { name: '037. RWA 4,3Ha (Full)', lat: 48.579132, lon: 16.164903 },
  { name: '038. RWA 1,5Ha (Full)', lat: 48.551712, lon: 16.070226 },
  { name: '039. Saat 1,57Ha (Full)', lat: 48.591558, lon: 16.154773 },
  { name: '040. Saat 2,11Ha (Full)', lat: 48.590655, lon: 16.159436 },
  { name: '041. Saat 6,41Ha (Full)', lat: 48.596760, lon: 16.148459 },
  { name: '042. Saat 0,44Ha (Full)', lat: 48.568947, lon: 16.182398 },
  { name: '043. Saat 3,48Ha (Full)', lat: 48.689204, lon: 16.208222 },
  { name: '044. Saat 4,54Ha (Full)', lat: 48.626296, lon: 16.137316 },
  { name: '045. Saat 5Ha (Full)', lat: 48.667535, lon: 16.048122 },
  { name: '046. Saat 4,11Ha (Full)', lat: 48.578102, lon: 15.979669 },
  { name: '047. Saat 1,85Ha (Full)', lat: 48.576511, lon: 15.977950 },
  { name: '048. PONT', lat: 48.539389, lon: 16.265556 },
  { name: '048. Saat 3,2Ha (Full szerviz)', lat: 48.539889, lon: 16.267184 },
  { name: '049. Saat 5,47Ha (Gép utáni)', lat: 48.589694, lon: 16.896855 },
  { name: '050. Saat 5,62Ha (Gép utáni)', lat: 48.575055, lon: 16.852994 },
  { name: '051. Saat 3,11Ha (Gép utáni)', lat: 48.571020, lon: 16.847191 },
  { name: '052. Saat 1,81Ha (Gép utáni)', lat: 48.567978, lon: 16.843561 },
  { name: '053. Saat 12,11Ha (Gép utáni)', lat: 48.590438, lon: 16.864731 },
  { name: '054. Saat 3,96Ha (Gép utáni)', lat: 48.595138, lon: 16.869538 },
  { name: '055. Saat 4,99Ha (Full)', lat: 48.597658, lon: 16.862579 },
  { name: '056. Saat 2,47Ha (Full)', lat: 48.595318, lon: 16.864274 },
  { name: '057. Egyéb 4,95Ha (Full)', lat: 48.209451, lon: 16.769986 },
  { name: '058. KWS 3,77Ha (Full)', lat: 48.189733, lon: 16.754169 },
  { name: '059. RWA 4,8Ha (Full)', lat: 48.186622, lon: 16.756142 },
  { name: '060. RWA 4,4Ha (Full)', lat: 48.179899, lon: 16.775178 },
  { name: '061. KWS 4,67Ha (Full)', lat: 48.192983, lon: 16.813400 },
  { name: '062. KWS 2,92Ha (FC)', lat: 48.193662, lon: 16.810861 },
  { name: '063. KWS 1,73Ha (FC)', lat: 48.181355, lon: 16.810134 },
  { name: '064. KWS 6,7Ha (Full)', lat: 48.176735, lon: 16.797767 },
  { name: '065. Saat 2,8Ha (Full)', lat: 48.212537, lon: 16.843833 },
  { name: '066. RWA 2,86Ha (Full)', lat: 48.235924, lon: 16.768451 },
  { name: '067. RWA 3Ha (Full)', lat: 48.251109, lon: 16.817541 },
  { name: '068. Saat 6,94Ha (FC)', lat: 48.239204, lon: 16.798551 },
  { name: '069. RWA 6,59Ha (FC)', lat: 48.232230, lon: 16.809839 },
  { name: '070. RWA 5,48Ha (FC)', lat: 48.211466, lon: 16.805675 },
  { name: '071. Saat 1,7Ha (FC)', lat: 48.200207, lon: 16.818984 },
  { name: '072. RWA 4,72Ha (FC)', lat: 48.204195, lon: 16.845236 },
  { name: '073. RWA 5,3Ha (FC)', lat: 48.209376, lon: 16.874779 },
  { name: '074. RWA 5Ha (FC)', lat: 48.210469, lon: 16.776208 },
  { name: '075. RWA 2,7Ha (Full)', lat: 48.183713, lon: 16.794086 },
  { name: '076. KWS 4,03Ha (Full)', lat: 48.185544, lon: 16.806435 },
  { name: '077. RWA 4,98Ha (Full)', lat: 48.187841, lon: 16.900219 },
  { name: '078. KWas 4,97Ha (FC)', lat: 48.167550, lon: 16.791089 },
  { name: '079. KWS 2,35Ha (FC)', lat: 48.172344, lon: 16.793182 },
  { name: '080. KWS 1,45Ha (FC)', lat: 48.172442, lon: 16.794035 },
  { name: '081. KWS 2,6Ha (FC)', lat: 48.171775, lon: 16.817737 },
  { name: '082. RWA 1,99Ha (FC)', lat: 48.162157, lon: 16.789409 },
  { name: '083. KWS 5,58Ha (Full)', lat: 48.201995, lon: 16.929356 },
  { name: '084. KWS 5,77Ha (Full)', lat: 48.214481, lon: 16.882839 },
  { name: '085. RWA 3,3Ha (Full+Idegeneles)', lat: 48.189269, lon: 16.929992 },
  { name: '086. RWA 3,15Ha (Full)', lat: 48.188257, lon: 16.928431 },
  { name: '087. KWS 2,5Ha (Full)', lat: 48.202199, lon: 16.951233 },
  { name: '088. RWA 5,33Ha (Full)', lat: 48.205596, lon: 16.942787 },
  { name: '089. Saat 1Ha (Full,Aroldo)', lat: 48.187844, lon: 16.952656 },
  { name: '090. Saat 1,29Ha (Full, Aroldo)', lat: 48.185718, lon: 16.949729 },
  { name: '091. Saat 1,7Ha (Full, Aroldo)', lat: 48.182926, lon: 16.947605 },
  { name: '092. Saat 1,2Ha (Full, Aroldo)', lat: 48.189448, lon: 16.955540 },
  { name: '093. Saat 2,14Ha (Full)', lat: 48.188571, lon: 16.956673 },
  { name: '094. RWA 7,06Ha (Full)', lat: 48.208654, lon: 16.949683 },
  { name: '095. Saat 2,5Ha (Full)', lat: 48.247951, lon: 16.925426 },
  { name: '096. RWA 4,3Ha (Full)', lat: 48.201239, lon: 16.941255 },
  { name: '097. RWA 6,08Ha (Full)', lat: 48.198187, lon: 16.937652 },
  { name: '098. Saat 1,51Ha (Full)', lat: 48.187015, lon: 16.959153 },
  { name: '099. Saat 1,21Ha (Full)', lat: 48.185090, lon: 16.957582 },
  { name: '100. KWS 2,5Ha (Full)', lat: 48.203166, lon: 16.955486 },
  { name: '101. RWA 9,3Ha (Full)', lat: 48.202352, lon: 16.938715 },
  { name: '102. Helyi termeltető 3,5Ha (Full)', lat: 48.192462, lon: 16.913054 },
  { name: '103. Saat 5,3Ha (Full)', lat: 48.191167, lon: 16.909093 },
  { name: '104. KWS 2,5Ha (Full)', lat: 48.204007, lon: 16.856415 },
  { name: '105. KWS 1,5Ha (FC)', lat: 48.258455, lon: 16.933656 },
  { name: '106. Helyi termeltető 2,31Ha (FC)', lat: 48.242817, lon: 16.941587 },
  { name: '107. RWA 2,82Ha (FC)', lat: 48.240774, lon: 16.931030 },
  { name: '108. Saat 4,6Ha (Full)', lat: 48.330833, lon: 16.790505 },
  { name: '109. Saat 2,82Ha (Full)', lat: 48.328325, lon: 16.787484 },
  { name: '110. Saat 2,68Ha (Full)', lat: 48.310265, lon: 16.731567 },
  { name: '111. Saját 5,57Ha (Full)', lat: 48.309463, lon: 16.736402 },
  { name: '112. Saat 6Ha (Full)', lat: 48.329424, lon: 16.811926 },
  { name: '113. RWA 3,14Ha (Full)', lat: 48.365656, lon: 16.777340 },
  { name: '114. Saat 4Ha (Full)', lat: 48.330296, lon: 16.741016 },
  { name: '115. RWA 9,85Ha (FC)', lat: 48.193406, lon: 16.874237 },
  { name: '116. Saat 9,8Ha (FC)', lat: 48.193645, lon: 16.904891 },
  { name: '117. Saat 6,85Ha (FC)', lat: 48.178126, lon: 16.904134 },
  { name: '118. Saat 3,3Ha (FC)', lat: 48.173215, lon: 16.893228 },
  { name: '119. Saat 3,7Ha (FC)', lat: 48.174635, lon: 16.821450 },
  { name: '120. Saat 0,9Ha (FC)', lat: 48.154311, lon: 16.802396 },
  { name: '121. Helyi termeltető 4,8Ha (FC)', lat: 48.151340, lon: 16.806467 },
  { name: '122. Helyi termeltető 3,14Ha (FC)', lat: 48.150861, lon: 16.807842 },
  { name: '123. Helyi termeltető 9,7Ha (FC)', lat: 48.147349, lon: 16.785782 },
  { name: '124. Helyi termeltető 5,6Ha (FC)', lat: 48.254461, lon: 16.717924 },
  { name: '125. KWS 6,4Ha (FC)', lat: 48.272404, lon: 16.720049 },
  { name: '126. Saat 5,3Ha (FC)', lat: 48.279218, lon: 16.736253 },
  { name: '127. RWA 4,2Ha (FC)', lat: 48.276679, lon: 16.710898 },
  { name: '128. RWA 2,15Ha (FC)', lat: 48.278183, lon: 16.672983 },
  { name: '129. RWA 3,03Ha (FC)', lat: 48.276846, lon: 16.673009 },
  { name: '130. RWA 3,2Ha (FC)', lat: 48.262102, lon: 16.674421 },
  { name: '131. RWA 4,5Ha (Full)', lat: 48.308627, lon: 16.799271 },
  { name: '132. Saat 2,2Ha (Full)', lat: 48.306414, lon: 16.841384 },
  { name: '133. RWA 7,3Ha (Full)', lat: 48.287681, lon: 16.845968 },
  { name: '134. Saat 2Ha (Full)', lat: 48.238773, lon: 16.858301 },
  { name: '135. Saat 2,2Ha (Full)', lat: 48.207509, lon: 16.828288 },
  { name: '136. Saat 11,3Ha (Full)', lat: 48.201053, lon: 16.827082 },
  { name: '137. RWA 1,8Ha (Full)', lat: 48.228912, lon: 16.816217 },
  { name: '138. Saat 4,5Ha (FC)', lat: 47.812932, lon: 16.812305 },
  { name: '139. Saat 1,8Ha (Full)', lat: 47.817590, lon: 16.819730 },
  { name: '140. Saat 9,6Ha (FC)', lat: 47.819407, lon: 16.833175 },
  { name: '141. Corteva 4,5Ha (FC)', lat: 47.800010, lon: 16.831513 },
  { name: '142. Corteva 10Ha (FC)', lat: 47.798177, lon: 16.837715 },
  { name: '143. Saat 3,8Ha (FC)', lat: 47.784879, lon: 16.816971 },
  { name: '144. Corteva 2,9Ha (FC)', lat: 47.779996, lon: 16.843850 },
  { name: '145. Corteva 9,5Ha (Full)', lat: 47.778841, lon: 16.855799 },
  { name: '146. Corteva 4,15Ha (Full)', lat: 47.791540, lon: 16.834170 },
  { name: '147. Corteva 1,36Ha (Full)', lat: 47.791988, lon: 16.833960 },
  { name: '148. Corteva 2,27Ha (Full)', lat: 47.794858, lon: 16.821879 },
  { name: '149. Corteva 3,8Ha (Full)', lat: 47.800112, lon: 16.823804 },
  { name: '150. Saat 2,1Ha (Gépi, Amelo)', lat: 47.788462, lon: 16.811962 },
  { name: '151. Corteva 4,76Ha (Full)', lat: 47.771864, lon: 16.824505 },
  { name: '152. Saat 1,81Ha (Full)', lat: 47.734004, lon: 16.885911 },
  { name: '153. Corteva 1,7Ha (FC)', lat: 47.729715, lon: 16.869238 },
  { name: '154. Corteva 4,3Ha (FC)', lat: 47.768648, lon: 16.830005 },
  { name: '155. Saat 5,14Ha (Full)', lat: 47.852206, lon: 16.845942 },
  { name: '156. Saat 3,84Ha (Full)', lat: 47.851919, lon: 16.849926 },
  { name: '157. Saat 1,75Ha (Full)', lat: 47.817866, lon: 16.820986 },
  { name: '158. Saat 1,53Ha (Full)', lat: 47.818492, lon: 16.814068 },
  { name: '159. Saat 6,24Ha (Full)', lat: 47.817285, lon: 16.813649 },
  { name: '160. Saat 4,9Ha (Full)', lat: 47.846759, lon: 16.879494 },
  { name: '161. Saat 0,5Ha (Full)', lat: 47.844244, lon: 16.883655 },
  { name: '162. Saat 4,9Ha (Full)', lat: 47.847391, lon: 16.880411 },
  { name: '163. Saat 1,8Ha (Full)', lat: 47.858207, lon: 16.852909 },
  { name: '164. Saat 4,2Ha (Full)', lat: 47.859059, lon: 16.851854 },
  { name: '165. Saat 3,2Ha (Full)', lat: 47.857091, lon: 16.846599 },
  { name: '166. Corteva 2,8Ha (Full)', lat: 47.842783, lon: 16.891208 },
  { name: '167. Corteva 5,8Ha (Full)', lat: 47.843689, lon: 16.892700 },
  { name: '168. Corteva 11,8Ha (Full)', lat: 47.821046, lon: 16.904861 },
  { name: '169. Saat 4,7Ha (FC)', lat: 47.838266, lon: 16.945300 },
  { name: '170. Corteva 7Ha (FC)', lat: 47.817474, lon: 16.948680 },
  { name: '171. Saat 12,53Ha (Full)', lat: 47.829977, lon: 16.940527 },
  { name: '172. Saat 9Ha (Full)', lat: 47.815724, lon: 16.813163 },
  { name: '173. Saat 5,6Ha (Full)', lat: 47.814255, lon: 16.812724 },
  { name: '174. Corteva 7,83Ha (Full)', lat: 47.808273, lon: 16.893523 },
  { name: '175. Corteva 3,44Ha (Full)', lat: 47.816659, lon: 16.902928 },
  { name: '176. Corteva 4Ha (Full)', lat: 47.815164, lon: 16.910762 },
  { name: '177. Corteva 6,4Ha (Full)', lat: 47.833816, lon: 16.949617 },
  { name: '178. Saat 14Ha (Gép utáni)', lat: 47.825228, lon: 16.960642 },
  { name: '179. Corteva 5,3Ha (Full)', lat: 47.734964, lon: 16.922209 },
  { name: '17Ha ebből 10 Ha steril Dömötör', lat: 48.154593, lon: 17.389655 },
  { name: '180. Corteva 4,84Ha (FC)', lat: 47.739334, lon: 16.927512 },
  { name: '181. Corteva 4,4Ha (Full)', lat: 47.739770, lon: 16.938976 },
  { name: '182. Corteva 6Ha (FC)', lat: 47.740592, lon: 16.942222 },
  { name: '183. Corteva 2,3Ha (FC)', lat: 47.768021, lon: 16.920042 },
  { name: '184. Corteva 2,6Ha (Full)', lat: 47.699450, lon: 16.957293 },
  { name: '185. Corteva 2,75Ha (Full)', lat: 47.696654, lon: 16.958784 },
  { name: '186. Corteva 6Ha (Full)', lat: 47.808817, lon: 17.049674 },
  { name: '187. Corteva 6,5Ha (Full)', lat: 47.768676, lon: 17.054971 },
  { name: '188. Corteva 4Ha (Full)', lat: 47.772183, lon: 17.064166 },
  { name: '189. Corteva 5,28Ha (Full)', lat: 47.787313, lon: 17.000273 },
  { name: '190. Corteva 10,18Ha (Full)', lat: 47.768642, lon: 17.060822 },
  { name: '191. Corteva 1Ha (Full)', lat: 47.861077, lon: 17.009217 },
  { name: '192. Corteva 4,7Ha (Full)', lat: 47.851154, lon: 16.997787 },
  { name: '193. Corteva 2,22Ha (Full)', lat: 47.855867, lon: 17.003360 },
  { name: '194. Corteva 1,75Ha (Full)', lat: 47.849349, lon: 17.021969 },
  { name: '195. Corteva 2,43Ha (Full)', lat: 47.829083, lon: 16.997946 },
  { name: '196. Corteva 3,4Ha (Full)', lat: 47.866763, lon: 17.009243 },
  { name: '197. Corteva 6,2Ha (Full)', lat: 47.840112, lon: 16.983584 },
  { name: '198. Corteva 3,5Ha (Full)', lat: 47.755444, lon: 16.960087 },
  { name: '199. Corteva 13Ha (Full)', lat: 47.758830, lon: 16.953948 },
  { name: '200. Corteva 11,5Ha (Full)', lat: 47.789360, lon: 16.987445 },
  { name: '201. Corteva 12,42Ha (Full)', lat: 47.993542, lon: 17.110086 },
  { name: '202. Corteva 8,11Ha (Full)', lat: 47.995903, lon: 17.106847 },
  { name: '203. Saat 5,6Ha (Full)', lat: 47.976471, lon: 17.101326 },
  { name: '204. Saat 8Ha (Full)', lat: 47.981516, lon: 17.102476 },
  { name: '205. Saat 16Ha (Full)', lat: 47.979632, lon: 17.106328 },
  { name: '206. Corteva 16Ha (Full)', lat: 48.008413, lon: 17.142350 },
  { name: '207. Corteva 15Ha (Full)', lat: 48.012230, lon: 17.146240 },
  { name: '208. Corteva 5,74Ha (Full)', lat: 47.768866, lon: 16.922482 },
  { name: '209. Corteva 2,88Ha (Full)', lat: 47.804725, lon: 16.938807 },
  { name: '210. Corteva 4,82Ha (Full)', lat: 47.809192, lon: 16.938959 },
  { name: '211. Corteva 6,21Ha (Full)', lat: 47.811045, lon: 16.944529 },
  { name: '212. Corteva 13Ha (Full)', lat: 47.805090, lon: 16.933857 },
  { name: '213. Corteva 7,6Ha (Full)', lat: 47.807246, lon: 16.899546 },
  { name: '214. Corteva 3,3Ha (Full)', lat: 47.780371, lon: 16.897992 },
  { name: '215. Corteva 2,5Ha (Full,korai)', lat: 47.791975, lon: 16.922954 },
  { name: '216. Corteva 7,95Ha (FC, kései)', lat: 47.773998, lon: 16.925838 },
  { name: '217. Corteva 4,8Ha (FC, Korai)', lat: 47.802776, lon: 16.938754 },
  { name: '218. Corteva 4,8Ha (FC, közepes)', lat: 47.800895, lon: 16.956891 },
  { name: '219. Corteva 4Ha (FC, Közepes)', lat: 47.768413, lon: 16.954824 },
  { name: '220. Corteva 3,94Ha (Full, korai)', lat: 47.772617, lon: 16.907748 },
  { name: '221. Corteva 1,46Ha (Full, közepes)', lat: 47.772365, lon: 16.936914 },
  { name: '222. Corteva 5,72Ha (Full, Közepes)', lat: 47.775019, lon: 16.930900 },
  { name: '223. Corteva 1,95Ha (Full, Közepes)', lat: 47.792321, lon: 16.948307 },
  { name: '224. Corteva 1,96Ha (Full, Közepes)', lat: 47.795065, lon: 16.945139 },
  { name: '225. Corteva 6,25Ha (Full, közepes)', lat: 47.800042, lon: 16.955156 },
  { name: '226. Corteva 1,71Ha (Full, Közepes)', lat: 47.814360, lon: 16.954643 },
  { name: '227. Corteva 4,18Ha (Full, Közepes)', lat: 47.777892, lon: 16.916355 },
  { name: '228. Corteva 1,14Ha Full, Korai)', lat: 47.780988, lon: 16.900747 },
  { name: '229. Corteva 2,03Ha (Full, Közepes)', lat: 47.774824, lon: 16.930095 },
  { name: '230. Corteva 2,2Ha (FC,Közepes)', lat: 47.767257, lon: 16.932863 },
  { name: '231. Corteva 3,39Ha (FC,Korai)', lat: 47.798607, lon: 16.928320 },
  { name: '232. Corteva 4Ha (Full, Korai)', lat: 47.860515, lon: 17.009545 },
  { name: '233. Corteva 5,12Ha (Full)', lat: 47.774621, lon: 16.842137 },
  { name: '234. Corteva 8,32Ha (Full)', lat: 47.785916, lon: 16.879024 },
  { name: '235. 7,1ha 1092F853-01', lat: 47.737751, lon: 16.872368 },
  { name: '236. 6:2 3,8ha p7404', lat: 47.804445, lon: 16.816930 },
  { name: '237 .6:2 2,2ha p7404', lat: 47.806865, lon: 16.817746 },
  { name: '238. Corteva 1,9Ha (Full)', lat: 47.779656, lon: 16.843021 },
  { name: '239. Corteva 4,9Ha (Full)', lat: 47.771020, lon: 16.824767 },
  { name: '23Ha Dömötör', lat: 48.131160, lon: 17.332526 },
  { name: '240. Corteva 3,0Ha (Full)', lat: 47.795950, lon: 16.822987 },
  { name: '241. Corteva 3,43Ha (Full)', lat: 47.807466, lon: 16.818228 },
  { name: '242. Corteva 1,2Ha (Full)', lat: 47.814264, lon: 16.836376 },
  { name: '243. Corteva 2,4Ha (Full)', lat: 47.783287, lon: 16.876307 },
  { name: '244. Corteva 8,5Ha (FC)', lat: 47.797503, lon: 16.923812 },
  { name: 'Abaszallas 7.6ha', lat: 48.339994, lon: 17.977287 },
  { name: 'BC Majstor 20Ha (1,6-1,8m )', lat: 45.693372, lon: 18.788473 },
  { name: 'BC405 10Ha (1,8m)', lat: 45.904482, lon: 18.718322 },
  { name: 'BC415 33Ha  (1,8m)', lat: 45.906930, lon: 18.710595 },
  { name: 'BC572 20Ha (Magas)', lat: 45.901111, lon: 18.723528 },
  { name: 'bojda 10.9ha', lat: 48.389640, lon: 18.092806 },
  { name: 'Bojda 13.5ha', lat: 48.385807, lon: 18.089456 },
  { name: 'Bojda 18ha', lat: 48.396349, lon: 18.107775 },
  { name: 'Bojda 2.6ha', lat: 48.378391, lon: 18.016503 },
  { name: 'Bojda 20,6Ha (RWA) Vasari', lat: 48.400516, lon: 18.121306 },
  { name: 'Bojda 38.6ha', lat: 48.384074, lon: 18.013444 },
  { name: 'Bojda 8.9ha', lat: 48.395758, lon: 18.099190 },
  { name: 'Cifare 31ha', lat: 48.235127, lon: 18.401543 },
  { name: 'Drava 404 30Ha (Csatorna mellett nem a miénk)', lat: 45.720528, lon: 18.750692 },
  { name: 'Dömötör 12 Ha Steril mellett', lat: 48.119736, lon: 17.334185 },
  { name: 'Dömötör 5Ha', lat: 48.128935, lon: 17.339363 },
  { name: 'Greenpoint', lat: 48.234552, lon: 18.398642 },
  { name: 'Jan bitter 42Ha Oseva', lat: 48.614867, lon: 17.816049 },
  { name: 'JANI', lat: 46.860998, lon: 20.561634 },
  { name: 'OS Filigran 25ha (1,6m)', lat: 45.898497, lon: 18.712627 },
  { name: 'OS Kulak 40Ha (1,6m)', lat: 45.899949, lon: 18.707719 },
  { name: 'OS Singular 35Ha (Csatorna mellett is miénk)', lat: 45.713052, lon: 18.749346 },
  { name: 'OS Tomasov 20Ha (1,6m)', lat: 45.896356, lon: 18.716307 },
  { name: 'OS Velmir 20Ha (2M magas körül)', lat: 45.700068, lon: 18.785466 },
  { name: 'OS3397  25Ha Korai (1,6-7m)', lat: 45.698968, lon: 18.772402 },
  { name: 'Oseva 43.7ha Holland', lat: 48.387693, lon: 17.623351 },
  { name: 'Oseva Landlord 25Ha \n(Martinovics)', lat: 48.512687, lon: 17.617855 },
  { name: 'Pajdas 30Ha (1,6m)', lat: 45.899699, lon: 18.728529 },
  { name: 'Szlama 30ha', lat: 48.005152, lon: 18.243987 },
  { name: 'Tomasov 28ha', lat: 48.168390, lon: 17.337747 },
  { name: 'Untersiebenbrunn szállás', lat: 48.256851, lon: 16.743542 },
  { name: 'Wallern szállás', lat: 47.725945, lon: 16.937860 },
];

// Globális változók az állapot tárolására
let selectedLocations = [];
let weatherData = {}; // Cache az adatoknak
let map;
const markers = {};

// HTML elemek referenciái
const loader = document.getElementById('loader');
const forecastContainer = document.getElementById('forecast-container');
const selectedForecastsDiv = document.getElementById('selected-forecasts');
const sevenDayContainer = document.getElementById('seven-day-summary-container');
const sevenDayList = document.getElementById('seven-day-list');

// Térkép inicializálása
function initializeMap() {
  map = L.map('map').setView([47.95, 16.9], 9);

  // JAVÍTOTT TILE URL
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  locations.forEach((loc) => {
    const marker = L.marker([loc.lat, loc.lon]).addTo(map);
    marker.bindPopup(loc.name_display || loc.name);
    marker.on('click', () => handleMarkerClick(loc, marker));
    markers[loc.name] = marker; // Marker elmentése a későbbi stílusozáshoz
  });
}

// Marker kattintás kezelése
async function handleMarkerClick(location, marker) {
  const locationName = location.name;
  const markerElement = marker._icon;

  if (selectedLocations.includes(locationName)) {
    // Kijelölés megszüntetése
    selectedLocations = selectedLocations.filter((name) => name !== locationName);
    markerElement.classList.remove('selected-marker');
  } else {
    // Kijelölés
    selectedLocations.push(locationName);
    markerElement.classList.add('selected-marker');

    // Adatok lekérése, ha még nincsenek letöltve
    if (!weatherData[locationName]) {
      loader.style.display = 'block';
      const data = await fetchWeather(location);
      weatherData[locationName] = processWeatherData(data);
      loader.style.display = 'none';
    }
  }
  renderSelectedForecasts();
}

// A kiválasztott előrejelzések újra-renderelése
function renderSelectedForecasts() {
  selectedForecastsDiv.innerHTML = ''; // Konténer kiürítése

  if (selectedLocations.length === 0) {
    forecastContainer.style.display = 'none';
    return;
  }

  forecastContainer.style.display = 'block';

  selectedLocations.forEach((locName) => {
    const data = weatherData[locName];
    if (data) {
      const location = locations.find((l) => l.name === locName);
      const displayName = location.name_display || location.name;

      // HTML string generálása az adatokból
      let forecastHTML = `
        <div class="location-forecast">
          <h3>${displayName}</h3>
          <div class="day-forecast">
            <h4>Holnap</h4>
            <div><strong>Max. hőmérséklet:</strong> ${data.daily[1].maxTemp}°C</div>
            <div>
              <strong>Szél:</strong> Max. ${data.daily[1].maxWind} km/h,
              <span class="highlight">lökések akár ${data.daily[1].maxGust} km/h</span>.
              ${data.nextDay.windChange ? `(${data.nextDay.windChange})` : ''}
            </div>
            <div>
              <strong>Csapadék (5:00-20:00):</strong>
              ${
                data.nextDay.rain.length > 0
                  ? `<div class='rain-details'>${data.nextDay.rain
                      .map((r) => `${r.hour}:00 (${r.amount} mm)`)
                      .join(', ')}</div>`
                  : `<span class='rain-highlight'> Nem várható.</span>`
              }
            </div>
          </div>
          <div class="day-forecast">
            <h4>Következő 3 nap (szél és csapadék)</h4>
            ${data.daily
              .slice(2, 4)
              .map(
                (day) => `
              <div>
                <strong>${new Date(day.date).toLocaleDateString('hu-HU', {
                  weekday: 'long',
                })}:</strong>
                &nbsp;Eső: ${day.precipSum} mm, Szél: max ${day.maxWind} km/h (lökések: ${
                  day.maxGust
                } km/h)
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `;

      selectedForecastsDiv.innerHTML += forecastHTML;
    }
  });
}

// API hívás egy helyszínre
async function fetchWeather(location) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&hourly=temperature_2m,precipitation,wind_speed_10m,wind_gusts_10m&daily=temperature_2m_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max&timezone=Europe%2FBudapest&forecast_days=8`;

  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    console.error('Hiba az időjárás adatok lekérésekor:', error);
    return null;
  }
}

// 7 napos összefoglaló készítése (összes helyre)
async function fetchAllDataForSummary() {
  loader.style.display = 'block';

  const allPromises = locations.map((loc) => fetchWeather(loc));
  const allRawData = await Promise.all(allPromises);

  const allProcessedData = {};
  allRawData.forEach((data, index) => {
    if (data) {
      const locName = locations[index].name;
      allProcessedData[locName] = processWeatherData(data);
    }
  });

  // Elmentjük a már letöltött adatokat a cache-be
  weatherData = { ...weatherData, ...allProcessedData };

  const summary = generateSevenDaySummary(allProcessedData);
  renderSevenDaySummary(summary);

  loader.style.display = 'none';
  sevenDayContainer.style.display = 'block';
}

// 7 napos összefoglaló kirajzolása (javított, robusztusabb)
function renderSevenDaySummary(summary) {
  sevenDayList.innerHTML = ''; // Lista kiürítése

  // Ellenőrizzük, hogy a 'summary' egy tömb és vannak-e benne elemek
  if (!Array.isArray(summary) || summary.length === 0) {
    sevenDayList.innerHTML = '<li>Nem sikerült betölteni a heti előrejelzést.</li>';
    return;
  }

  summary.forEach((day) => {
    let dayHTML;
    const hasSignificantEvent = day.highWind.length > 0 || day.heavyRain.length > 0;
    const dateString = new Date(day.date).toLocaleDateString('hu-HU', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    if (hasSignificantEvent) {
      // Ha van esemény, listázzuk őket
      dayHTML = `
        <li>
          <strong>${dateString}</strong>
          ${
            day.highWind.length > 0
              ? `<div>💨 <span class="highlight">Erős szél:</span> ${day.highWind.join(
                  ', '
                )}</div>`
              : ''
          }
          ${
            day.heavyRain.length > 0
              ? `<div>💧 <span class="rain-highlight">Jelentős eső:</span> ${day.heavyRain.join(
                  ', '
                )}</div>`
              : ''
          }
        </li>
      `;
    } else {
      // Ha nincs esemény, jelezzük, hogy nyugodt az idő
      dayHTML = `
        <li>
          <strong>${dateString}</strong>
          <div>✅ Nyugodt idő várható.</div>
        </li>
      `;
    }

    sevenDayList.innerHTML += dayHTML;
  });
}

// ----- ADATFELDOLGOZÓ FÜGGVÉNYEK -----

function processWeatherData(apiData) {
  if (!apiData) return null;

  const daily = apiData.daily.time.map((date, i) => ({
    date,
    maxTemp: Math.round(apiData.daily.temperature_2m_max[i]),
    precipSum: apiData.daily.precipitation_sum[i].toFixed(1),
    maxWind: Math.round(apiData.daily.wind_speed_10m_max[i]),
    maxGust: Math.round(apiData.daily.wind_gusts_10m_max[i]),
  }));

  const nextDayRain = [];
  const hourlyTime = apiData.hourly.time;
  const tomorrowDateStr = apiData.daily.time[1];

  let morningMaxWind = 0;
  let afternoonMaxWind = 0;

  for (let i = 0; i < hourlyTime.length; i++) {
    if (hourlyTime[i].startsWith(tomorrowDateStr)) {
      const hour = new Date(hourlyTime[i]).getHours();

      if (hour >= 5 && hour <= 20 && apiData.hourly.precipitation[i] > 0.1) {
        nextDayRain.push({
          hour,
          amount: apiData.hourly.precipitation[i].toFixed(1),
        });
      }

      if (hour >= 5 && hour < 13 && apiData.hourly.wind_speed_10m[i] > morningMaxWind) {
        morningMaxWind = apiData.hourly.wind_speed_10m[i];
      }
      if (hour >= 13 && hour <= 20 && apiData.hourly.wind_speed_10m[i] > afternoonMaxWind) {
        afternoonMaxWind = apiData.hourly.wind_speed_10m[i];
      }
    }
  }

  let windChange = '';
  if (morningMaxWind > afternoonMaxWind * 1.5)
    windChange = 'délelőtt erősebb, délutánra gyengül';
  else if (afternoonMaxWind > morningMaxWind * 1.5)
    windChange = 'délelőtt gyengébb, délutánra erősödik';

  return {
    daily,
    nextDay: {
      rain: nextDayRain,
      windChange,
    },
  };
}

function generateSevenDaySummary(allData) {
  const summaryByDay = {};
  const WIND_GUST_THRESHOLD = 40; // km/h
  const RAIN_SUM_THRESHOLD = 5; // mm

  for (const locationName in allData) {
    const weather = allData[locationName];
    if (!weather) continue;

    const displayName =
      (locations.find((l) => l.name === locationName) || {}).name_display || locationName;

    weather.daily.forEach((day) => {
      if (!summaryByDay[day.date]) {
        summaryByDay[day.date] = { date: day.date, highWind: [], heavyRain: [] };
      }
      if (day.maxGust >= WIND_GUST_THRESHOLD) {
        summaryByDay[day.date].highWind.push(
          `${displayName} (${Math.round(day.maxGust)} km/h)`
        );
      }
      if (day.precipSum >= RAIN_SUM_THRESHOLD) {
        summaryByDay[day.date].heavyRain.push(`${displayName} (${day.precipSum} mm)`);
      }
    });
  }

  return Object.values(summaryByDay).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
}

// --- FONTOS: itt hívjuk meg közvetlenül, NEM DOMContentLoaded-del ---

initializeMap();
fetchAllDataForSummary();
