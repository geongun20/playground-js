import * as ssh from "node-ssh";

const sequences: string[] = [
  "171204_pose1",
  "171204_pose2",
  "171204_pose3",
  "171204_pose4",
  "171204_pose5",
  "171204_pose6",
  "171026_pose1",
  "171026_pose2",
  "171026_pose3",
  "171026_cello1",
  "171026_cello2",
  "171026_cello3",
  "161029_flute1",
  "161029_piano1",
  "161029_piano2",
  "161029_piano3",
  "161029_piano4",
  "160906_band1",
  "160906_band2",
  "160906_band3",
  "160422_ultimatum1",
  "160226_ultimatum1",
  "160224_ultimatum1",
  "160224_ultimatum2",
  "160422_mafia2",
  "160226_mafia1",
  "160226_mafia2",
  "160224_mafia1",
  "160224_mafia2",
  "160422_haggling1",
  "160226_haggling1",
  "160224_haggling1",
  "170221_haggling_b1",
  "170221_haggling_b2",
  "170221_haggling_b3",
  "170221_haggling_m1",
  "170221_haggling_m2",
  "170221_haggling_m3",
  "170224_haggling_a1",
  "170224_haggling_a2",
  "170224_haggling_a3",
  "170224_haggling_b1",
  "170224_haggling_b2",
  "170224_haggling_b3",
  "170228_haggling_a1",
  "170228_haggling_a2",
  "170228_haggling_a3",
  "170228_haggling_b1",
  "170228_haggling_b2",
  "170228_haggling_b3",
  "170404_haggling_a1",
  "170404_haggling_a2",
  "170404_haggling_a3",
  "170404_haggling_b1",
  "170404_haggling_b2",
  "170404_haggling_b3",
  "170407_haggling_a1",
  "170407_haggling_a2",
  "170407_haggling_a3",
  "170407_haggling_b1",
  "170407_haggling_b2",
  "170407_haggling_b3",
  "170307_dance1",
  "170307_dance2",
  "170307_dance3",
  "170307_dance4",
  "170307_dance5",
  "170307_dance6",
  "160317_moonbaby1",
  "160317_moonbaby2",
  "160317_moonbaby3",
  "170915_toddler2",
  "170915_toddler3",
  "170915_toddler4",
  "160906_ian5",
  "160906_ian3",
  "160906_ian2",
  "160906_ian1",
  "160401_ian3",
  "160401_ian2",
  "160401_ian1",
  "170915_office1",
  "170407_office2",
  "160906_pizza1",
];

const SSH_CONFIG = {
  host: "vcl.snu.ac.kr", // 원격 서버 IP 주소 또는 호스트 이름
  port: 1000,
  username: "snuvcl", // 원격 서버 사용자 이름
  password: "Capture138*", // 원격 서버 비밀번호
};

const DATASET_ROOT_PATH = "/volume1/web/panoptic/webdata/dataset";

async function main() {
  try {
    const sshInstance = new ssh.NodeSSH();

    // SSH 연결
    await sshInstance.connect(SSH_CONFIG);

    console.log("SSH connection established.");

    const lsResult = await sshInstance.execCommand(
      `cd ${DATASET_ROOT_PATH} && ls`
    );

    const sequencesInNas1 = lsResult.stdout.split("\n");

    for await (const sequence of sequencesInNas1) {
      const lsResult = await sshInstance.execCommand(
        `cd ${DATASET_ROOT_PATH}/${sequence}/videos/kinect_shared_crf20 && ls`
      );

      const videoFiles = lsResult.stdout
        .split("\n")
        .filter((file) => file.length > 0);

      for await (const videoFile of videoFiles) {
        const resultMv = await sshInstance.execCommand(
          `cd ${DATASET_ROOT_PATH}/${sequence}/videos/kinect_shared_crf20 && mv ${videoFile} ${
            videoFile.split("_kinect")[0]
          }_kinect${Number(videoFile.split("_kinect")[1].split(".")[0])}.mp4`
        );
        if (resultMv.code === 0) {
          console.log(`${sequence} path change succeed`);
        } else {
          console.error(
            `Failed to change folder name: ${sequence}`,
            resultMv.stderr
          );
        }
      }
    }

    // SSH 연결 종료
    sshInstance.dispose();
    console.log("SSH connection closed.");
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

main();
