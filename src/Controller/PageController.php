<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\HttpFoundation\Response;

class PageController extends Controller {
    private
        $finder,
        $folder,
        $enabledFormats;

    public function __construct() {
        $this->finder = new Finder;

        $settings = Yaml::parseFile(__DIR__ . '/../../config/settings.yaml');
        $this->folder = $settings['music_library'];
        $this->enabledFormats = $settings['enabled_formats'];
    }

    /**
     * @Route("/{path}", name="list")
     */
    public function list($path = '') {
        /*foreach(array_unique($this->getFiles($this->folder . ($path ? ('/' . str_replace(';', '/', $path)) : ''), '/\.(mp3|flac)$/')) as $song) {
            $info = (new \getID3)->analyze($song);
            \getid3_lib::CopyTagsToComments($info);
            dump($info);
        } exit;*/

        return $this->render('Page/list.html.twig', [
            'path'      => $path,
            'title'     => (function($path) {
                $xPath = explode(';', $path);
                return $xPath[count($xPath) - 1];
            })($path),
            'folders'   => array_unique($this->getDirectories($this->folder . ($path ? ('/' . str_replace(';', '/', $path)) : ''))),
            'songs'     => array_unique($this->getFiles($this->folder . ($path ? ('/' . str_replace(';', '/', $path)) : ''), $this->enabledFormats))
        ]);
    }

    /**
     * @Route("/stream-song/{path}", name="stream_song")
     */
    public function streamSong($path) {
        $realPath = $this->folder . '/' . str_replace(';', '/', $path);
        $response = new BinaryFileResponse($realPath);
        $response->headers->set('Content-Type', (new \getID3)->analyze($realPath)['mime_type']);
        BinaryFileResponse::trustXSendfileTypeHeader();
        return $response;
    }

    private function getDirectories($path) {
        $this->finder->depth('== 0');
        $directories = [];
        foreach($this->finder->directories()->in($path) as $directory) {
            $directories[] = $directory;
        }
        return $directories;
    }

    private function getFiles($path, $filter = '*') {
        $this->finder->depth('== 0');
        $this->finder->sortByName(true);
        $files = [];
        foreach($this->finder->files()->in($path)->name($filter) as $file) {
            $files[] = $file;
        }
        return $files;
    }
}