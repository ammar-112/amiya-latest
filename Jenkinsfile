pipeline {
  agent any
  tools { jdk 'JDK21'; maven 'Maven3' }   // Jenkins > Global Tool Configuration mein yeh naam set karo
  environment { TOMCAT_WEBAPPS = '/opt/tomcat9/webapps' }  // apna Tomcat 9 path
  options { timestamps(); disableConcurrentBuilds() }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Build WAR') { steps { sh 'mvn -B clean package' } }
    stage('Verify') { steps { sh 'test -f target/amiya.war && unzip -l target/amiya.war | grep -q WEB-INF/web.xml' } }
    stage('Archive') { steps { archiveArtifacts artifacts: 'target/amiya.war', fingerprint: true } }
    stage('Deploy to Tomcat 9') {
      when { branch 'main' }
      steps {
        sh '''
          cp target/amiya.war "$TOMCAT_WEBAPPS/amiya.war"
          echo "Deployed: http://localhost:8080/amiya/"
        '''
      }
    }
  }
  post {
    success {
        echo 'AMIYA build aur deploy ho gaya.'
    }
    failure {
        echo 'Build fail hua, console log dekho.'
    }
}
}
